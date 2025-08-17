---
title: Google Cloud Platform
description: 'Deploy your Litestar application to Google Cloud Platform using App Engine, Cloud Run, or Compute Engine.'
componentImg: GoogleCloud
logoIcon: 'i-logos-google-cloud'
category: Hosting
nitroPreset: 'gcp'
website: 'https://cloud.google.com/'
---

# Deploy Litestar to Google Cloud Platform

Google Cloud Platform (GCP) offers multiple services for deploying Python applications like Litestar. This guide covers the most popular deployment options.

## Google Cloud Run

Cloud Run is a fully managed platform for running containerized applications. It's ideal for Litestar applications due to its simplicity and automatic scaling.

### Prerequisites

- Google Cloud SDK installed
- Docker installed
- A Google Cloud project with billing enabled

### Step 1: Create a Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["python", "-m", "litestar", "run", "--host", "0.0.0.0", "--port", "8080"]
```

### Step 2: Build and Deploy

```bash
# Build the container
gcloud builds submit --tag gcr.io/PROJECT_ID/litestar-app

# Deploy to Cloud Run
gcloud run deploy litestar-app \
  --image gcr.io/PROJECT_ID/litestar-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Google App Engine

App Engine provides a fully managed platform with automatic scaling and load balancing.

### Step 1: Create app.yaml

```yaml
runtime: python311

env_variables:
  PYTHONPATH: /opt/python

handlers:
- url: /.*
  script: auto

automatic_scaling:
  min_instances: 0
  max_instances: 10
```

### Step 2: Deploy

```bash
gcloud app deploy
```

## Google Compute Engine

For more control over the infrastructure, you can deploy to Compute Engine VMs.

### Step 1: Create a VM Instance

```bash
gcloud compute instances create litestar-vm \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud \
  --machine-type=e2-medium \
  --tags=http-server,https-server
```

### Step 2: Setup the Application

```bash
# SSH into the instance
gcloud compute ssh litestar-vm

# Install Python and dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx -y

# Setup your application
git clone your-repo
cd your-repo
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 3: Configure Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Environment Variables

For all deployment methods, you can set environment variables:

### Cloud Run
```bash
gcloud run services update litestar-app \
  --set-env-vars DATABASE_URL=your-db-url
```

### App Engine
Add to `app.yaml`:
```yaml
env_variables:
  DATABASE_URL: your-db-url
  SECRET_KEY: your-secret-key
```

## Database Integration

### Cloud SQL

```python
# Example connection to Cloud SQL PostgreSQL
import sqlalchemy as sa
from litestar import Litestar
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig

database_config = SQLAlchemyAsyncConfig(
    connection_string="postgresql+asyncpg://user:password@/db?host=/cloudsql/project:region:instance"
)

app = Litestar(
    plugins=[SQLAlchemyAsyncConfig]
)
```

## Monitoring and Logging

Google Cloud provides built-in monitoring and logging:

- **Cloud Logging**: Automatic log collection
- **Cloud Monitoring**: Performance metrics
- **Error Reporting**: Automatic error tracking

## Best Practices

1. **Use Cloud Build** for CI/CD pipelines
2. **Enable Cloud Armor** for DDoS protection
3. **Use Cloud CDN** for static content
4. **Implement health checks** for better reliability
5. **Use Cloud Secret Manager** for sensitive data

## Troubleshooting

### Common Issues

1. **Port Configuration**: Ensure your app listens on the port specified by the `PORT` environment variable
2. **Cold Starts**: Consider using minimum instances for Cloud Run
3. **Memory Limits**: Monitor and adjust memory allocation as needed

### Useful Commands

```bash
# View logs
gcloud logs tail

# Check service status
gcloud run services list

# Update service
gcloud run services update SERVICE_NAME --set-env-vars KEY=VALUE
```