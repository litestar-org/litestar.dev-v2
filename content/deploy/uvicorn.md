---
title: Uvicorn
description: 'Deploy your Litestar application using Uvicorn, the lightning-fast ASGI server implementation.'
componentImg: Uvicorn
logoIcon: '/img/uvicorn.png'
category: Technology
nitroPreset: 'uvicorn'
website: 'https://www.uvicorn.org/'
---

# Deploy Litestar with Uvicorn

Uvicorn is a lightning-fast ASGI server implementation, using uvloop and httptools. It's the most popular choice for running ASGI applications like Litestar in production, offering excellent performance and broad ecosystem support.

## Installation

```bash
# Basic installation
pip install uvicorn

# With all optional dependencies (recommended)
pip install uvicorn[standard]

# Production extras
pip install uvicorn gunicorn
```

## Basic Usage

### Development Server

```bash
# Simple development server with auto-reload
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Production Server

```bash
# Production configuration
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Application Setup

### Basic Litestar Application

```python
# app/main.py
from litestar import Litestar, get

@get("/")
async def hello() -> dict[str, str]:
    return {"message": "Hello from Litestar with Uvicorn!"}

@get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "healthy"}

app = Litestar(
    route_handlers=[hello, health_check],
    debug=False
)
```

### Production Application

```python
# app/main.py
import os
from litestar import Litestar
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig, SQLAlchemyPlugin
from litestar.logging import LoggingConfig
from litestar.middleware.rate_limit import RateLimitConfig

# Database configuration
database_config = SQLAlchemyAsyncConfig(
    connection_string=os.getenv("DATABASE_URL", "sqlite+aiosqlite:///app.db"),
    metadata=...,  # Your SQLAlchemy metadata
)

# Rate limiting
rate_limit_config = RateLimitConfig(
    rate_limit=("minute", 100),
    exclude=["/health", "/metrics"]
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
    middleware=[rate_limit_config.middleware],
    logging_config=logging_config,
    debug=False,
)
```

## Configuration Options

### Command Line Arguments

```bash
# Production configuration with all options
uvicorn app.main:app \
  --host 0.0.0.0 \
  --port 8000 \
  --workers 4 \
  --loop uvloop \
  --http httptools \
  --log-level info \
  --access-log \
  --proxy-headers \
  --forwarded-allow-ips '*' \
  --ssl-keyfile /path/to/key.pem \
  --ssl-certfile /path/to/cert.pem \
  --limit-concurrency 1000 \
  --limit-max-requests 10000 \
  --timeout-keep-alive 5
```

### Configuration File

Create a `uvicorn.json` configuration file:

```json
{
  "app": "app.main:app",
  "host": "0.0.0.0",
  "port": 8000,
  "workers": 4,
  "loop": "uvloop",
  "http": "httptools",
  "log_level": "info",
  "access_log": true,
  "proxy_headers": true,
  "forwarded_allow_ips": "*",
  "limit_concurrency": 1000,
  "limit_max_requests": 10000,
  "timeout_keep_alive": 5
}
```

Run with configuration file:

```bash
uvicorn --config uvicorn.json
```

### YAML Configuration

```yaml
# uvicorn.yaml
app: 'app.main:app'
host: '0.0.0.0'
port: 8000
workers: 4
loop: 'uvloop'
http: 'httptools'
log_level: 'info'
access_log: true
proxy_headers: true
forwarded_allow_ips: '*'
ssl_keyfile: '/path/to/key.pem'
ssl_certfile: '/path/to/cert.pem'
```

## Process Management with Gunicorn

### Basic Gunicorn + Uvicorn

```bash
# Using Gunicorn as process manager with Uvicorn workers
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Advanced Gunicorn Configuration

```python
# gunicorn.conf.py
import multiprocessing

# Server socket
bind = "0.0.0.0:8000"
backlog = 2048

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
max_requests = 10000
max_requests_jitter = 1000
preload_app = True
timeout = 30
keepalive = 5

# Logging
loglevel = "info"
accesslog = "/var/log/litestar/access.log"
errorlog = "/var/log/litestar/error.log"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Process naming
proc_name = "litestar"

# Server mechanics
daemon = False
pidfile = "/var/run/litestar.pid"
user = "www-data"
group = "www-data"
tmp_upload_dir = None
secure_scheme_headers = {
    "X-FORWARDED-PROTOCOL": "ssl",
    "X-FORWARDED-PROTO": "https",
    "X-FORWARDED-SSL": "on"
}

# SSL
keyfile = "/path/to/key.pem"
certfile = "/path/to/cert.pem"

# Worker lifecycle
def when_ready(server):
    server.log.info("Server is ready. Spawning workers")

def worker_int(worker):
    worker.log.info("worker received INT or QUIT signal")

def pre_fork(server, worker):
    server.log.info("Worker spawned (pid: %s)", worker.pid)

def post_fork(server, worker):
    server.log.info("Worker spawned (pid: %s)", worker.pid)

def post_worker_init(worker):
    worker.log.info("Worker initialized (pid: %s)", worker.pid)

def worker_abort(worker):
    worker.log.info("Worker aborted (pid: %s)", worker.pid)
```

Run with Gunicorn configuration:

```bash
gunicorn --config gunicorn.conf.py app.main:app
```

## Production Deployment

### Systemd Service

```ini
# /etc/systemd/system/litestar-uvicorn.service
[Unit]
Description=Litestar Application with Uvicorn
After=network.target

[Service]
Type=exec
User=www-data
Group=www-data
WorkingDirectory=/opt/litestar-app
Environment=PATH=/opt/litestar-app/venv/bin
Environment=DATABASE_URL=postgresql://user:pass@localhost/db
Environment=SECRET_KEY=your-secret-key
ExecStart=/opt/litestar-app/venv/bin/gunicorn \
  --config /opt/litestar-app/gunicorn.conf.py \
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

# Run with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Multi-stage Docker Build

```dockerfile
# Build stage
FROM python:3.11-slim as builder

RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Production stage
FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy wheels and install
COPY --from=builder /app/wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache /wheels/*

# Copy application
COPY . .

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
USER app

EXPOSE 8000

# Production command with Gunicorn
CMD ["gunicorn", "--config", "gunicorn.conf.py", "app.main:app"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  litestar:
    build: .
    ports:
      - '8000:8000'
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/litestar_db
      - SECRET_KEY=your-secret-key
      - WORKERS=4
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    volumes:
      - ./logs:/var/log/litestar
    command: >
      gunicorn 
      --bind 0.0.0.0:8000 
      --workers 4 
      --worker-class uvicorn.workers.UvicornWorker 
      --access-logfile /var/log/litestar/access.log 
      --error-logfile /var/log/litestar/error.log 
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

  redis:
    image: redis:7-alpine
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - litestar
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

    # Health checks (nginx plus)
    # health_check interval=10s;
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

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

        # Buffer sizes
        proxy_buffering on;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }

    location /static/ {
        alias /opt/litestar-app/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /health {
        proxy_pass http://litestar_backend;
        access_log off;
    }
}
```

## SSL/TLS Configuration

### Self-signed Certificate (Development)

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Run with SSL
uvicorn app.main:app --ssl-keyfile key.pem --ssl-certfile cert.pem --port 443
```

### Let's Encrypt with Certbot

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (add to crontab)
0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring and Observability

### Health Checks

```python
# app/health.py
import asyncio
import psutil
from litestar import get
from litestar.status_codes import HTTP_200_OK, HTTP_503_SERVICE_UNAVAILABLE

@get("/health")
async def health_check() -> dict:
    """Basic health check endpoint."""
    return {"status": "healthy", "service": "litestar"}

@get("/health/detailed")
async def detailed_health_check() -> dict:
    """Detailed health check with system metrics."""
    try:
        # Check database connectivity
        # await database.execute("SELECT 1")

        # System metrics
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')

        return {
            "status": "healthy",
            "timestamp": asyncio.get_event_loop().time(),
            "system": {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "disk_percent": (disk.used / disk.total) * 100
            },
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
```

### Metrics and Logging

```python
# app/middleware.py
import time
import logging
from litestar import Request, Response
from litestar.middleware.base import AbstractMiddleware

logger = logging.getLogger(__name__)

class MetricsMiddleware(AbstractMiddleware):
    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        request = Request(scope=scope, receive=receive)
        start_time = time.time()

        # Process request
        response = await self.app(scope, receive, send)

        # Log metrics
        duration = time.time() - start_time
        logger.info(
            f"Request: {request.method} {request.url.path} "
            f"Status: {response.status_code} "
            f"Duration: {duration:.3f}s"
        )

        return response
```

### Prometheus Metrics

```python
# app/metrics.py
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from litestar import get, Response

# Metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests', ['method', 'endpoint', 'status'])
REQUEST_DURATION = Histogram('http_request_duration_seconds', 'HTTP request duration')

@get("/metrics")
async def metrics() -> Response:
    """Prometheus metrics endpoint."""
    return Response(
        content=generate_latest(),
        media_type=CONTENT_TYPE_LATEST
    )
```

## Performance Tuning

### Worker Configuration

```bash
# CPU-bound workload
gunicorn app.main:app -w $(nproc) -k uvicorn.workers.UvicornWorker

# I/O-bound workload (recommended)
gunicorn app.main:app -w $(($(nproc) * 2 + 1)) -k uvicorn.workers.UvicornWorker

# Memory-optimized
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --max-requests 1000 --max-requests-jitter 50
```

### Connection Limits

```bash
# High-traffic configuration
uvicorn app.main:app \
  --host 0.0.0.0 \
  --port 8000 \
  --limit-concurrency 2000 \
  --limit-max-requests 100000 \
  --timeout-keep-alive 75 \
  --h11-max-incomplete-event-size 1000000
```

### Environment Variables

```bash
# Performance tuning
export UVICORN_LOOP=uvloop
export UVICORN_HTTP=httptools
export PYTHONUNBUFFERED=1
export PYTHONDONTWRITEBYTECODE=1

# Application settings
export DATABASE_POOL_SIZE=20
export DATABASE_MAX_OVERFLOW=40
export REDIS_POOL_SIZE=50
```

## Best Practices

1. **Use Gunicorn with Uvicorn workers** for production deployments
2. **Enable proxy headers** when behind a reverse proxy
3. **Set appropriate worker counts** based on your workload type
4. **Use SSL/TLS** for all production deployments
5. **Implement proper health checks** for load balancer integration
6. **Monitor performance metrics** and adjust configuration accordingly
7. **Use connection pooling** for database connections
8. **Enable access logging** for debugging and monitoring
9. **Set resource limits** to prevent resource exhaustion
10. **Use graceful shutdowns** for zero-downtime deployments

## Troubleshooting

### Common Issues

1. **Worker timeouts**: Increase timeout values for long-running requests
2. **Memory leaks**: Use `max-requests` to periodically restart workers
3. **Connection errors**: Check proxy headers and firewall settings
4. **SSL issues**: Verify certificate paths and permissions

### Debugging Commands

```bash
# Check Uvicorn processes
ps aux | grep uvicorn

# Test application
curl -v http://localhost:8000/health

# Check port binding
netstat -tlnp | grep :8000

# Monitor worker memory usage
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | grep uvicorn

# Check SSL certificate
openssl x509 -in cert.pem -text -noout
```

### Performance Monitoring

```bash
# Monitor request rates
tail -f /var/log/litestar/access.log | pv -l -r > /dev/null

# Check response times
tail -f /var/log/litestar/access.log | awk '{print $NF}' | sort -n

# Monitor error rates
tail -f /var/log/litestar/access.log | grep -E " (4[0-9][0-9]|5[0-9][0-9]) "
```

Uvicorn provides excellent performance and reliability for Litestar applications, making it the go-to choice for most production deployments when combined with proper process management and monitoring.
