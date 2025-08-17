---
title: Microsoft Azure
description: 'Deploy your Litestar application to Microsoft Azure using App Service, Container Instances, or Virtual Machines.'
componentImg: Azure
logoIcon: 'i-logos-microsoft-azure'
category: Hosting
nitroPreset: 'azure'
website: 'https://azure.microsoft.com/'
---

# Deploy Litestar to Microsoft Azure

Microsoft Azure provides multiple deployment options for Python applications like Litestar. This guide covers the most popular Azure services for hosting your application.

## Azure App Service

Azure App Service is a fully managed platform for building, deploying, and scaling web apps.

### Prerequisites

- Azure CLI installed
- An Azure subscription
- Your Litestar application code

### Step 1: Create an App Service

```bash
# Login to Azure
az login

# Create a resource group
az group create --name litestar-rg --location "East US"

# Create an App Service plan
az appservice plan create --name litestar-plan --resource-group litestar-rg --sku B1 --is-linux

# Create the web app
az webapp create --resource-group litestar-rg --plan litestar-plan --name your-litestar-app --runtime "PYTHON|3.11"
```

### Step 2: Configure Deployment

```bash
# Configure local Git deployment
az webapp deployment source config-local-git --name your-litestar-app --resource-group litestar-rg

# Set startup command
az webapp config set --resource-group litestar-rg --name your-litestar-app --startup-file "python -m litestar run --host 0.0.0.0 --port 8000"
```

### Step 3: Deploy Your Code

```bash
# Add Azure remote
git remote add azure <git-clone-url-from-previous-command>

# Deploy
git push azure main
```

## Azure Container Instances

For containerized deployments, Azure Container Instances provides a simple way to run containers.

### Step 1: Create a Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "-m", "litestar", "run", "--host", "0.0.0.0", "--port", "8000"]
```

### Step 2: Build and Push to Azure Container Registry

```bash
# Create Azure Container Registry
az acr create --resource-group litestar-rg --name litestarcr --sku Basic

# Login to registry
az acr login --name litestarcr

# Build and push image
az acr build --registry litestarcr --image litestar-app:latest .
```

### Step 3: Deploy Container

```bash
# Deploy to Container Instances
az container create \
  --resource-group litestar-rg \
  --name litestar-container \
  --image litestarcr.azurecr.io/litestar-app:latest \
  --registry-login-server litestarcr.azurecr.io \
  --registry-username $(az acr credential show --name litestarcr --query username -o tsv) \
  --registry-password $(az acr credential show --name litestarcr --query passwords[0].value -o tsv) \
  --dns-name-label litestar-app \
  --ports 8000
```

## Azure Virtual Machines

For maximum control, deploy to Azure Virtual Machines.

### Step 1: Create a VM

```bash
# Create a VM
az vm create \
  --resource-group litestar-rg \
  --name litestar-vm \
  --image Ubuntu2204 \
  --admin-username azureuser \
  --generate-ssh-keys \
  --size Standard_B2s

# Open port 80 for HTTP traffic
az vm open-port --port 80 --resource-group litestar-rg --name litestar-vm
```

### Step 2: Setup the Application

```bash
# SSH into the VM
ssh azureuser@<vm-public-ip>

# Update system and install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx git -y

# Clone and setup your application
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

### Step 4: Create a Systemd Service

```ini
# /etc/systemd/system/litestar.service
[Unit]
Description=Litestar application
After=network.target

[Service]
User=azureuser
WorkingDirectory=/home/azureuser/your-repo
Environment=PATH=/home/azureuser/your-repo/venv/bin
ExecStart=/home/azureuser/your-repo/venv/bin/python -m litestar run --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable litestar
sudo systemctl start litestar
```

## Azure Database Integration

### Azure Database for PostgreSQL

```python
# Example connection to Azure PostgreSQL
import sqlalchemy as sa
from litestar import Litestar
from litestar.contrib.sqlalchemy.plugins import SQLAlchemyAsyncConfig

database_config = SQLAlchemyAsyncConfig(
    connection_string="postgresql+asyncpg://username:password@servername.postgres.database.azure.com:5432/dbname"
)

app = Litestar(
    plugins=[SQLAlchemyAsyncConfig]
)
```

### Azure Cosmos DB

```python
# Example connection to Azure Cosmos DB
from azure.cosmos import CosmosClient

# Initialize Cosmos client
client = CosmosClient(
    url="https://your-account.documents.azure.com:443/",
    credential="your-primary-key"
)

database = client.get_database_client("your-database")
container = database.get_container_client("your-container")
```

## Environment Variables

### App Service
```bash
# Set application settings
az webapp config appsettings set --resource-group litestar-rg --name your-litestar-app --settings DATABASE_URL=your-db-url SECRET_KEY=your-secret-key
```

### Container Instances
```bash
# Set environment variables during deployment
az container create \
  --resource-group litestar-rg \
  --name litestar-container \
  --image your-image \
  --environment-variables DATABASE_URL=your-db-url SECRET_KEY=your-secret-key
```

## Azure Key Vault Integration

Store sensitive configuration in Azure Key Vault:

```python
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

# Initialize Key Vault client
credential = DefaultAzureCredential()
client = SecretClient(vault_url="https://your-vault.vault.azure.net/", credential=credential)

# Retrieve secrets
database_url = client.get_secret("database-url").value
secret_key = client.get_secret("secret-key").value
```

## Monitoring and Logging

### Application Insights

```python
# Add Application Insights to your Litestar app
from applicationinsights import TelemetryClient

tc = TelemetryClient('your-instrumentation-key')

@app.on_app_init
def configure_telemetry():
    tc.track_event('Application Started')
```

### Azure Monitor

- **Metrics**: CPU, memory, and request metrics
- **Logs**: Application and system logs
- **Alerts**: Automated alerting based on metrics

## Best Practices

1. **Use Azure DevOps** or **GitHub Actions** for CI/CD
2. **Enable Azure Security Center** for security recommendations
3. **Use Azure CDN** for static content delivery
4. **Implement Azure Front Door** for global load balancing
5. **Store secrets in Azure Key Vault**
6. **Use Azure Active Directory** for authentication

## Scaling and Performance

### Auto Scaling (App Service)

```bash
# Configure auto-scaling
az monitor autoscale create \
  --resource-group litestar-rg \
  --resource your-litestar-app \
  --resource-type Microsoft.Web/serverfarms \
  --name litestar-autoscale \
  --min-count 1 \
  --max-count 10 \
  --count 2
```

### Load Testing

Use Azure Load Testing to test your application performance:

```bash
# Create a load test
az load test create --name litestar-load-test --resource-group litestar-rg
```

## Troubleshooting

### Common Issues

1. **Startup Command**: Ensure the startup command is correctly configured
2. **Port Configuration**: App Service expects your app to listen on the port specified by the `PORT` environment variable
3. **Dependencies**: Make sure all dependencies are listed in `requirements.txt`

### Useful Commands

```bash
# View application logs
az webapp log tail --name your-litestar-app --resource-group litestar-rg

# Restart the application
az webapp restart --name your-litestar-app --resource-group litestar-rg

# SSH into App Service container
az webapp ssh --name your-litestar-app --resource-group litestar-rg
```

### Debugging

Enable SSH for App Service debugging:

```bash
# Enable SSH
az webapp config set --name your-litestar-app --resource-group litestar-rg --remote-debugging-enabled true
```