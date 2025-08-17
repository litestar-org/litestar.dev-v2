---
title: Granian
description: 'Deploy your Litestar application using Granian, a Rust HTTP server.'
componentImg: Granian
logoIcon: 'i-logos-rust'
category: Technology
nitroPreset: 'granian'
website: 'https://github.com/emmett-framework/granian'
---

# Deploy Litestar with Granian

Granian is a Rust HTTP server for Python applications that supports WSGI, ASGI, and RSGI protocols. It offers exceptional performance, built-in process management, and is designed to be a production-ready server for Python web applications like Litestar.

## Installation

```bash
# Install Granian
pip install granian

# Or install with optional dependencies
pip install granian[reload]  # For development with auto-reload
```

## Basic Usage

### Simple Deployment

```bash
# Run your Litestar application
granian --interface asgi app.main:app
```

### With Custom Configuration

```bash
# Production configuration
granian \
  --interface asgi \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --threads 2 \
  --backlog 1024 \
  --log-level info \
  app.main:app
```

## Application Setup

### Basic Litestar Application

```python
# app/main.py
from litestar import Litestar, get

@get("/")
async def hello() -> dict[str, str]:
    return {"message": "Hello from Litestar with Granian!"}

@get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}

app = Litestar(
    route_handlers=[hello, health_check],
    debug=False
)
```

### Production Application with Database

```python
# app/main.py
import os
from litestar import Litestar
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig, SQLAlchemyPlugin
from litestar.logging import LoggingConfig

# Database configuration
database_config = SQLAlchemyAsyncConfig(
    connection_string=os.getenv("DATABASE_URL", "sqlite+aiosqlite:///app.db"),
    metadata=...,  # Your SQLAlchemy metadata
)

# Logging configuration
logging_config = LoggingConfig(
    root={"level": "INFO", "handlers": ["console"]},
    formatters={
        "standard": {"format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"}
    },
)

app = Litestar(
    route_handlers=[...],  # Your route handlers
    plugins=[SQLAlchemyPlugin(config=database_config)],
    logging_config=logging_config,
    debug=False,
)
```

## Configuration Options

### Command Line Arguments

```bash
# Performance tuning
granian \
  --interface asgi \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --threads 2 \
  --worker-class async \
  --backlog 1024 \
  --max-requests 10000 \
  --max-requests-jitter 1000 \
  --timeout-keep-alive 75 \
  --timeout-graceful-shutdown 30 \
  --log-level info \
  --access-log \
  --ssl-keyfile /path/to/key.pem \
  --ssl-certfile /path/to/cert.pem \
  app.main:app
```

### Configuration File

Create a `granian.toml` configuration file:

```toml
[granian]
interface = "asgi"
host = "0.0.0.0"
port = 8000
workers = 4
threads = 2
worker_class = "async"
backlog = 1024
max_requests = 10000
max_requests_jitter = 1000
timeout_keep_alive = 75
timeout_graceful_shutdown = 30
log_level = "info"
access_log = true

[granian.ssl]
keyfile = "/path/to/key.pem"
certfile = "/path/to/cert.pem"

[granian.app]
target = "app.main:app"
```

Run with configuration file:

```bash
granian --config granian.toml
```

## Process Management

### Worker Configuration

```bash
# CPU-bound applications
granian --interface asgi --workers 8 --threads 1 app.main:app

# I/O-bound applications  
granian --interface asgi --workers 4 --threads 4 app.main:app

# Auto-detect CPU cores
granian --interface asgi --workers 0 app.main:app  # Uses CPU count
```

### Worker Classes

```bash
# Async worker (default, recommended for ASGI)
granian --interface asgi --worker-class async app.main:app

# Sync worker (for WSGI applications)
granian --interface wsgi --worker-class sync app.main:app

# Thread worker
granian --interface asgi --worker-class thread app.main:app
```

## Production Deployment

### Systemd Service

```ini
# /etc/systemd/system/litestar-granian.service
[Unit]
Description=Litestar Application with Granian
After=network.target

[Service]
Type=exec
User=www-data
Group=www-data
WorkingDirectory=/opt/litestar-app
Environment=PATH=/opt/litestar-app/venv/bin
Environment=DATABASE_URL=postgresql://user:pass@localhost/db
Environment=SECRET_KEY=your-secret-key
ExecStart=/opt/litestar-app/venv/bin/granian \
  --interface asgi \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --threads 2 \
  --log-level info \
  --access-log \
  app.main:app
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=3
KillMode=mixed
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
```

### Docker Deployment

```dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
USER app

# Expose port
EXPOSE 8000

# Run with Granian
CMD ["granian", "--interface", "asgi", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "app.main:app"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  litestar:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/litestar_db
      - SECRET_KEY=your-secret-key
    depends_on:
      - postgres
    restart: unless-stopped
    command: >
      granian 
      --interface asgi 
      --host 0.0.0.0 
      --port 8000 
      --workers 4 
      --threads 2 
      --log-level info 
      --access-log 
      app.main:app

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=litestar_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

## Load Balancing and Reverse Proxy

### Nginx Configuration

```nginx
upstream litestar_backend {
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
    server 127.0.0.1:8003;
    server 127.0.0.1:8004;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://litestar_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /static/ {
        alias /opt/litestar-app/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### HAProxy Configuration

```
global
    daemon
    maxconn 4096

defaults
    mode http
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend litestar_frontend
    bind *:80
    default_backend litestar_backend

backend litestar_backend
    balance roundrobin
    option httpchk GET /health
    server web1 127.0.0.1:8001 check
    server web2 127.0.0.1:8002 check
    server web3 127.0.0.1:8003 check
    server web4 127.0.0.1:8004 check
```

## SSL/TLS Configuration

### Built-in SSL

```bash
# Generate self-signed certificate (development only)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Run with SSL
granian \
  --interface asgi \
  --host 0.0.0.0 \
  --port 443 \
  --ssl-keyfile key.pem \
  --ssl-certfile cert.pem \
  --workers 4 \
  app.main:app
```

### Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d your-domain.com

# Run with Let's Encrypt certificates
granian \
  --interface asgi \
  --host 0.0.0.0 \
  --port 443 \
  --ssl-keyfile /etc/letsencrypt/live/your-domain.com/privkey.pem \
  --ssl-certfile /etc/letsencrypt/live/your-domain.com/fullchain.pem \
  --workers 4 \
  app.main:app
```

## Monitoring and Logging

### Access Logging

```bash
# Enable access logging
granian --interface asgi --access-log app.main:app

# Custom access log format
granian --interface asgi --access-log --access-log-format combined app.main:app
```

### Application Logging

```python
# app/logging.py
import logging
import sys

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler('/var/log/litestar/app.log')
        ]
    )

# In your main.py
from app.logging import setup_logging
setup_logging()
```

### Health Checks

```python
# app/health.py
from litestar import get
from litestar.status_codes import HTTP_200_OK

@get("/health", status_code=HTTP_200_OK)
async def health_check() -> dict[str, str]:
    # Add your health check logic here
    # Check database connectivity, external services, etc.
    return {"status": "healthy", "service": "litestar"}

@get("/ready")
async def readiness_check() -> dict[str, str]:
    # Check if application is ready to serve traffic
    return {"status": "ready"}
```

## Performance Tuning

### Optimal Worker Configuration

```bash
# For CPU-intensive tasks
granian --workers $(nproc) --threads 1 app.main:app

# For I/O-intensive tasks
granian --workers $(($(nproc) / 2)) --threads 4 app.main:app

# General purpose (recommended starting point)
granian --workers 4 --threads 2 app.main:app
```

### Memory and Connection Limits

```bash
granian \
  --interface asgi \
  --workers 4 \
  --threads 2 \
  --backlog 1024 \
  --max-requests 10000 \
  --max-requests-jitter 1000 \
  --timeout-keep-alive 75 \
  --timeout-graceful-shutdown 30 \
  app.main:app
```

### Environment Variables

```bash
# Production environment variables
export GRANIAN_WORKERS=4
export GRANIAN_THREADS=2
export GRANIAN_BACKLOG=1024
export GRANIAN_LOG_LEVEL=info

# Application-specific variables
export DATABASE_URL="postgresql://user:pass@localhost/db"
export SECRET_KEY="your-secret-key"
export ENVIRONMENT="production"
```

## Best Practices

1. **Use async workers** for ASGI applications like Litestar
2. **Configure appropriate worker/thread counts** based on your workload
3. **Enable access logging** in production for monitoring
4. **Use a reverse proxy** (Nginx/HAProxy) for SSL termination and load balancing
5. **Implement health checks** for monitoring and load balancer integration
6. **Set resource limits** to prevent memory exhaustion
7. **Use graceful shutdown** to handle deployments properly
8. **Monitor performance** and adjust configuration accordingly

## Troubleshooting

### Common Issues

1. **Import errors**: Ensure your PYTHONPATH includes your application directory
2. **Port binding issues**: Check if the port is already in use
3. **Worker crashes**: Monitor logs for memory or resource issues
4. **Performance problems**: Adjust worker/thread configuration

### Debugging Commands

```bash
# Check if Granian is running
ps aux | grep granian

# Test application manually
curl http://localhost:8000/health

# Check port usage
netstat -tlnp | grep :8000

# Monitor resource usage
htop -p $(pgrep granian)
```

### Log Analysis

```bash
# Follow application logs
journalctl -u litestar-granian -f

# Check for errors
journalctl -u litestar-granian --since "1 hour ago" | grep ERROR

# Performance monitoring
tail -f /var/log/litestar/access.log | grep -E "(5[0-9][0-9]|4[0-9][0-9])"
```

Granian provides excellent performance for Litestar applications with minimal configuration overhead, making it an ideal choice for production deployments where performance is critical.