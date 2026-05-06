#!/bin/bash

# Deploy to AWS EC2 using SSH
# Make sure you have your EC2 key pair and instance IP

EC2_USER="ec2-user"
EC2_HOST="your-ec2-instance.amazonaws.com"
EC2_KEY_PATH="~/.ssh/your-key.pem"
REPO_URL="https://github.com/yourusername/agroex-pro.git"

echo "🚀 Deploying AgroEx Pro to EC2..."

# SSH into EC2 and run deployment commands
ssh -i $EC2_KEY_PATH $EC2_USER@$EC2_HOST << 'EOF'

# Update system
sudo yum update -y

# Install Docker
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add ec2-user to docker group
sudo usermod -a -G docker $EC2_USER

# Clone repository
git clone $REPO_URL agroex-pro
cd agroex-pro

# Create environment file
cp .env.example .env
# Edit .env with your production values

# Start services
docker-compose up -d

# Check services
docker-compose ps

echo "✅ Deployment complete!"
EOF

echo "🎉 AgroEx Pro is now running on EC2!"
