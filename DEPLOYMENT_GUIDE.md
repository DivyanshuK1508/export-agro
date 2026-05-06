# 🚀 Deployment Guide - Export-Oriented Agro System

This guide covers deploying your system from development to production.

---

## 📊 Deployment Scenarios

### Scenario 1: Local Development (Recommended for Testing)
- Backend: Python Flask locally
- Frontend: Vite dev server locally
- Communication: Direct HTTP localhost

### Scenario 2: Docker Container (Recommended for Production)
- Backend: Docker container
- Frontend: Docker container
- Communication: Internal network

### Scenario 3: Cloud Deployment (Scalable)
- Backend: Cloud function or managed service
- Frontend: Static hosting (Netlify, Vercel, S3)
- Communication: HTTPS to live API

### Scenario 4: Virtual Private Server (Traditional)
- Backend: VM or dedicated server
- Frontend: Web server (Nginx/Apache)
- Communication: HTTPS with domain

---

## 🏠 Scenario 1: Local Development Setup

### Prerequisites
- Python 3.7+
- Node.js 14+
- Git (optional)

### Step 1: Backend Setup
```bash
cd Backend
pip install -r requirements.txt
python app.py
```

Expected output:
```
 * Serving Flask app 'app'
 * Running on http://127.0.0.1:5000
```

### Step 2: Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

Expected output:
```
  VITE v.x.x  ready in 123 ms

  ➜  Local:   http://localhost:5173/
```

### Step 3: Verify Connection
1. Open http://localhost:5173
2. Go to "Crop Recommendation"
3. Fill form and submit
4. Verify results appear

✅ Done! System is ready for development.

---

## 🐳 Scenario 2: Docker Container Deployment

### Prerequisites
- Docker installed
- Docker Compose (optional but recommended)

### Option A: Docker Compose (Easiest)

**Create `docker-compose.yml`** in project root:

```yaml
version: '3.8'

services:
  backend:
    build: ./Backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./Backend/models:/app/models
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks:
      - agro-network

  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
      args:
        - VITE_API_BASE_URL=http://backend:5000
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - agro-network

networks:
  agro-network:
    driver: bridge
```

**Create `Backend/Dockerfile`**:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

**Create `Frontend/Dockerfile`**:

```dockerfile
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG VITE_API_BASE_URL=http://localhost:5000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Create `Frontend/nginx.conf`**:

```nginx
server {
    listen 80;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
    }
}
```

**Deploy with Docker Compose**:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

### Option B: Individual Docker Containers

```bash
# Build backend image
cd Backend
docker build -t agro-backend .
docker run -p 5000:5000 agro-backend

# Build frontend image
cd Frontend
docker build -t agro-frontend .
docker run -p 3000:80 agro-frontend
```

---

## ☁️ Scenario 3: Cloud Deployment

### Option A: Netlify (Frontend) + Railway/Fly.io (Backend)

#### Deploy Frontend to Netlify

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/agro-system.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your repository
   - Set build command: `cd Frontend && npm run build`
   - Set publish directory: `Frontend/dist`
   - Set environment variable: `VITE_API_BASE_URL=https://your-backend-url.com`
   - Deploy!

#### Deploy Backend to Railway.app

1. **Create account** at https://railway.app

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Add variables:
     - `FLASK_ENV=production`
   - Railway automatically detects Python and runs `python app.py`

3. **Get Backend URL**
   - Railway provides a public URL (e.g., `https://agro-backend-production.up.railway.app`)
   - Update Netlify environment: `VITE_API_BASE_URL=https://agro-backend-production.up.railway.app`

### Option B: AWS Deployment

#### Backend (AWS Lambda + API Gateway)

```bash
# Package backend for Lambda
pip install zappa  # Lambda deployment tool
cd Backend
zappa init
zappa deploy production
```

#### Frontend (AWS S3 + CloudFront)

```bash
# Build
cd Frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Create CloudFront distribution for CDN
# Set S3 bucket as origin
# Configure API Gateway domain as CNAME
```

### Option C: Heroku (Simple Alternative)

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
heroku create agro-backend
heroku create agro-frontend

# Deploy backend
cd Backend
git push heroku main

# Deploy frontend
cd Frontend
heroku config:set VITE_API_BASE_URL=https://agro-backend.herokuapp.com
npm run build
# Move dist to Frontend folder for Heroku
git push heroku main
```

---

## 🔧 Scenario 4: Virtual Private Server (VPS)

### Option: DigitalOcean / Linode / Hetzner

#### Step 1: Initial Server Setup

```bash
# SSH to server
ssh root@your_server_ip

# Update system
apt update && apt upgrade -y

# Install dependencies
apt install -y python3 python3-pip nodejs npm nginx curl git

# Create app directory
mkdir -p /var/www/agro-system
cd /var/www/agro-system

# Clone repository
git clone https://github.com/yourusername/agro-system.git .
```

#### Step 2: Backend Setup

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r Backend/requirements.txt

# Create systemd service for backend
sudo tee /etc/systemd/system/agro-backend.service > /dev/null <<EOF
[Unit]
Description=Export-Oriented Agro Backend
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/agro-system/Backend
ExecStart=/var/www/agro-system/venv/bin/python3 app.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Enable service
sudo systemctl enable agro-backend
sudo systemctl start agro-backend
```

#### Step 3: Frontend Build

```bash
cd Frontend
npm install
npm run build

# Copy dist to web root
sudo mkdir -p /var/www/html/agro
sudo cp -r dist/* /var/www/html/agro/
sudo chown -R www-data:www-data /var/www/html/agro
```

#### Step 4: Nginx Configuration

```bash
sudo tee /etc/nginx/sites-available/agro > /dev/null <<'EOF'
# Backend API
upstream agro_backend {
    server 127.0.0.1:5000;
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://agro_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/html/agro;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://agro_backend;
        proxy_set_header Host $host;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/agro /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

#### Step 5: SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d api.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

```bash
# Run verification script
bash DEPLOYMENT_CHECKLIST.sh

# Manual checks:
□ Backend models are present
□ Flask CORS is enabled
□ Frontend environment variables set
□ API URL configured correctly
□ Error handling working
□ No hardcoded URLs
□ All dependencies installed
□ Tests passing
□ Performance acceptable
□ Security settings reviewed
□ Documentation updated
```

---

## 🔒 Security Checklist

```
BEFORE PRODUCTION:

✅ API/Backend
  □ Update CORS to specific origins only
  □ Use HTTPS/TLS in production
  □ Set strong environment variables
  □ Enable rate limiting (if needed)
  □ Review error messages (no details exposed)
  □ Set up monitoring/logging

✅ Frontend
  □ Remove debug code
  □ Minify and tree-shake
  □ Set secure headers
  □ Enable HTTPS only
  □ Configure CSP (Content Security Policy)

✅ Deployment
  □ Use environment variables for secrets
  □ Don't commit .env files
  □ Use HTTPS everywhere
  □ Enable database backups
  □ Set up monitoring
  □ Plan disaster recovery
```

---

## 📊 Performance Optimization

### Frontend
```bash
cd Frontend

# Build analysis
npm install -D vite-plugin-visualizer
npm run build -- --analyze

# Results are in dist/stats.html
```

### Backend
```python
# Add caching headers for models
# Models are loaded once at startup
# Consider Redis for distributed deployments
```

---

## 🚨 Troubleshooting Deployment

### Issue: "Cannot connect to backend"
```
Solution 1: Check backend is running
  ps aux | grep python

Solution 2: Check CORS is enabled in app.py
  from flask_cors import CORS
  CORS(app)

Solution 3: Check API URL in environment variable
  echo $VITE_API_BASE_URL
```

### Issue: "Models not found"
```
Check models directory:
  ls Backend/models/
  
Should contain: crop_model.pkl, yield_model.pkl, etc.
```

### Issue: "Port 5000 already in use"
```
Find process using port 5000:
  lsof -i :5000
  
Kill it:
  kill -9 <PID>
  
Or use different port:
  python app.py --port 5001
```

---

## 🔄 Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to production
        run: |
          # Add deployment commands
          echo "Deploying..."
```

---

## 📞 Support

- **Deployment Issues**: Check troubleshooting section
- **Performance**: Check performance optimization section
- **Security**: Check security checklist
- **Logs**: Check application logs for errors

---

**Ready to deploy! 🚀**
