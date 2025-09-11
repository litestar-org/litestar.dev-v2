---
title: NGINX Unit
description: 'Deploy your Litestar application using NGINX Unit, a lightweight and versatile application server.'
componentImg: NginxUnit
logoIcon: 'i-logos-nginx'
category: Technology
nitroPreset: 'nginx-unit'
website: 'https://unit.nginx.org/'
---

# Deploy Litestar with NGINX Unit

NGINX Unit is a lightweight and versatile application server that can run applications in multiple languages, including Python. It provides dynamic configuration, process management, and excellent performance for ASGI applications like Litestar.

## Installation

### Ubuntu/Debian

```bash
# Add NGINX Unit repository
curl --output /usr/share/keyrings/nginx-keyring.gpg \
     https://unit.nginx.org/keys/nginx-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/nginx-keyring.gpg] \
     https://packages.nginx.org/unit/ubuntu/ jammy unit" \
     > /etc/apt/sources.list.d/unit.list

# Install NGINX Unit with Python support
sudo apt update
sudo apt install unit unit-python3.11
```

### CentOS/RHEL

```bash
# Add NGINX Unit repository
sudo yum install -y https://packages.nginx.org/unit/centos/7/noarch/RPMS/unit-repo-1.0-1.el7.centos.noarch.rpm

# Install NGINX Unit with Python support
sudo yum install -y unit unit-python311
```

### Docker

```dockerfile
FROM nginx/unit:1.31.1-python3.11

# Copy your application
COPY . /app
WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy Unit configuration
COPY unit-config.json /docker-entrypoint.d/config.json
```

## Configuration

### Basic Configuration

Create a configuration file for NGINX Unit:

```json
{
  "listeners": {
    "*:8080": {
      "pass": "applications/litestar"
    }
  },
  "applications": {
    "litestar": {
      "type": "python 3.11",
      "path": "/path/to/your/app",
      "home": "/path/to/your/venv",
      "module": "main",
      "callable": "app",
      "protocol": "asgi"
    }
  }
}
```

### Advanced Configuration with Load Balancing

```json
{
  "listeners": {
    "*:8080": {
      "pass": "upstreams/litestar-backend"
    }
  },
  "upstreams": {
    "litestar-backend": {
      "servers": {
        "127.0.0.1:8001": {},
        "127.0.0.1:8002": {},
        "127.0.0.1:8003": {}
      }
    }
  },
  "applications": {
    "litestar-1": {
      "type": "python 3.11",
      "path": "/path/to/your/app",
      "home": "/path/to/your/venv",
      "module": "main",
      "callable": "app",
      "protocol": "asgi",
      "processes": 2,
      "working_directory": "/path/to/your/app",
      "environment": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db",
        "SECRET_KEY": "your-secret-key"
      }
    }
  },
  "routes": [
    {
      "match": {
        "uri": "/api/*"
      },
      "action": {
        "pass": "applications/litestar-1"
      }
    },
    {
      "match": {
        "uri": "/static/*"
      },
      "action": {
        "share": "/path/to/static/files"
      }
    }
  ]
}
```

## Application Setup

### Basic Litestar Application

```python
# main.py
from litestar import Litestar, get

@get("/")
async def hello() -> dict[str, str]:
    return {"message": "Hello from Litestar with NGINX Unit!"}

@get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}

app = Litestar(
    route_handlers=[hello, health_check],
    debug=False
)

# For NGINX Unit ASGI compatibility
application = app
```

### With Database and Environment Configuration

```python
# main.py
import os
from litestar import Litestar
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig, SQLAlchemyPlugin

# Database configuration
database_config = SQLAlchemyAsyncConfig(
    connection_string=os.getenv("DATABASE_URL", "sqlite+aiosqlite:///app.db"),
    metadata=...,  # Your SQLAlchemy metadata
)

app = Litestar(
    plugins=[SQLAlchemyPlugin(config=database_config)],
    debug=False,
)

# NGINX Unit expects 'application' variable
application = app
```

## Deployment Steps

### 1. Prepare Your Application

```bash
# Create project directory
mkdir /opt/litestar-app
cd /opt/litestar-app

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install litestar[standard] your-other-dependencies

# Copy your application code
cp -r /path/to/your/source/* .
```

### 2. Start NGINX Unit

```bash
# Start Unit service
sudo systemctl start unit
sudo systemctl enable unit

# Verify Unit is running
sudo systemctl status unit
```

### 3. Apply Configuration

```bash
# Apply the configuration via REST API
curl -X PUT --data-binary @unit-config.json \
     --unix-socket /var/run/unit/control.sock \
     http://localhost/config/
```

### 4. Test Your Application

```bash
# Test the application
curl http://localhost:8080/
curl http://localhost:8080/health
```

## Process Management

### Scaling Processes

```bash
# Update process count dynamically
curl -X PUT -d '"4"' \
     --unix-socket /var/run/unit/control.sock \
     http://localhost/config/applications/litestar/processes
```

### Memory Limits

```json
{
  "applications": {
    "litestar": {
      "type": "python 3.11",
      "path": "/opt/litestar-app",
      "home": "/opt/litestar-app/venv",
      "module": "main",
      "callable": "application",
      "protocol": "asgi",
      "processes": {
        "max": 4,
        "spare": 1,
        "idle_timeout": 30
      },
      "limits": {
        "timeout": 30,
        "requests": 1000
      }
    }
  }
}
```

## Static File Serving

```json
{
  "listeners": {
    "*:8080": {
      "pass": "routes"
    }
  },
  "routes": [
    {
      "match": {
        "uri": "/static/*"
      },
      "action": {
        "share": "/opt/litestar-app/static$uri"
      }
    },
    {
      "action": {
        "pass": "applications/litestar"
      }
    }
  ],
  "applications": {
    "litestar": {
      "type": "python 3.11",
      "path": "/opt/litestar-app",
      "home": "/opt/litestar-app/venv",
      "module": "main",
      "callable": "application",
      "protocol": "asgi"
    }
  }
}
```

## SSL/TLS Configuration

```json
{
  "certificates": {
    "litestar-cert": {
      "key": "/path/to/private.key",
      "chain": ["/path/to/cert.pem", "/path/to/intermediate.pem"]
    }
  },
  "listeners": {
    "*:443": {
      "pass": "applications/litestar",
      "tls": {
        "certificate": "litestar-cert"
      }
    },
    "*:80": {
      "pass": "routes/redirect"
    }
  },
  "routes": {
    "redirect": [
      {
        "action": {
          "return": 301,
          "location": "https://$host$request_uri"
        }
      }
    ]
  }
}
```

## Monitoring and Logging

### Status and Statistics

```bash
# Get application status
curl --unix-socket /var/run/unit/control.sock \
     http://localhost/status/

# Get detailed statistics
curl --unix-socket /var/run/unit/control.sock \
     http://localhost/status/applications/litestar
```

### Log Configuration

```json
{
  "settings": {
    "http": {
      "log_route": true,
      "server_version": false
    }
  },
  "access_log": "/var/log/unit/access.log"
}
```

### Log Rotation

```bash
# Configure logrotate
sudo cat > /etc/logrotate.d/unit << EOF
/var/log/unit/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    postrotate
        systemctl reload unit
    endscript
}
EOF
```

## Performance Tuning

### Worker Processes

```json
{
  "applications": {
    "litestar": {
      "processes": {
        "max": 8,
        "spare": 2,
        "idle_timeout": 60
      },
      "limits": {
        "timeout": 60,
        "requests": 10000
      }
    }
  }
}
```

### Memory and CPU Optimization

```bash
# Set Unit process limits
sudo systemctl edit unit
```

```ini
[Service]
LimitNOFILE=65536
LimitNPROC=32768
LimitMEMLOCK=infinity
```

## Production Deployment

### Systemd Service

```ini
# /etc/systemd/system/litestar-unit.service
[Unit]
Description=Litestar Application with NGINX Unit
After=network.target unit.service
Requires=unit.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/curl -X PUT --data-binary @/opt/litestar-app/unit-config.json --unix-socket /var/run/unit/control.sock http://localhost/config/
ExecReload=/usr/bin/curl -X PUT --data-binary @/opt/litestar-app/unit-config.json --unix-socket /var/run/unit/control.sock http://localhost/config/

[Install]
WantedBy=multi-user.target
```

### Health Checks

```bash
# Health check script
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/health)
if [ $response != "200" ]; then
    echo "Health check failed"
    exit 1
fi
echo "Health check passed"
```

## Best Practices

1. **Use virtual environments** for Python dependencies
2. **Configure proper process limits** based on your server resources
3. **Enable access logging** for monitoring and debugging
4. **Use SSL/TLS** for production deployments
5. **Implement health checks** for monitoring
6. **Configure log rotation** to prevent disk space issues
7. **Use environment variables** for configuration
8. **Monitor resource usage** and adjust process counts accordingly

## Troubleshooting

### Common Issues

1. **Configuration errors**: Validate JSON configuration before applying
2. **Permission issues**: Ensure Unit has access to application files
3. **Module import errors**: Check Python path and virtual environment
4. **Socket permissions**: Verify Unix socket permissions

### Useful Commands

```bash
# Get current configuration
curl --unix-socket /var/run/unit/control.sock http://localhost/config/

# Check Unit logs
sudo journalctl -u unit

# Validate configuration before applying
python -m json.tool unit-config.json

# Restart specific application
curl -X DELETE --unix-socket /var/run/unit/control.sock \
     http://localhost/config/applications/litestar
```
