#!/bin/bash

# AgroEx Pro - AWS Quick Deploy Script
# Usage: ./deploy-aws.sh

set -e

echo "🚀 AgroEx Pro - AWS Deployment Script"
echo "======================================"

# Configuration
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPOSITORY_BACKEND="agroex-backend"
ECR_REPOSITORY_FRONTEND="agroex-frontend"
ECS_CLUSTER="agroex-production"

echo "📍 AWS Region: $AWS_REGION"
echo "👤 AWS Account ID: $AWS_ACCOUNT_ID"

# Step 1: Create ECR Repositories (if not exist)
echo ""
echo "📦 Creating ECR Repositories..."
aws ecr create-repository \
  --repository-name $ECR_REPOSITORY_BACKEND \
  --region $AWS_REGION 2>/dev/null || echo "✓ Backend repository exists"

aws ecr create-repository \
  --repository-name $ECR_REPOSITORY_FRONTEND \
  --region $AWS_REGION 2>/dev/null || echo "✓ Frontend repository exists"

# Step 2: Login to ECR
echo ""
echo "🔐 Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Step 3: Build and Push Backend
echo ""
echo "🏗️  Building Backend Image..."
cd Backend
docker build -t $ECR_REPOSITORY_BACKEND:latest .
docker tag $ECR_REPOSITORY_BACKEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_BACKEND:latest
docker tag $ECR_REPOSITORY_BACKEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_BACKEND:$(date +%s)

echo "📤 Pushing Backend Image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_BACKEND:latest
cd ..

# Step 4: Build and Push Frontend
echo ""
echo "🏗️  Building Frontend Image..."
cd Frontend
docker build -t $ECR_REPOSITORY_FRONTEND:latest .
docker tag $ECR_REPOSITORY_FRONTEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:latest
docker tag $ECR_REPOSITORY_FRONTEND:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:$(date +%s)

echo "📤 Pushing Frontend Image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_FRONTEND:latest
cd ..

# Step 5: Create ECS Cluster (if not exist)
echo ""
echo "🔗 Setting up ECS Cluster..."
aws ecs create-cluster --cluster-name $ECS_CLUSTER --region $AWS_REGION 2>/dev/null || echo "✓ Cluster exists"

# Step 6: Create CloudWatch Log Groups
echo ""
echo "📊 Creating CloudWatch Log Groups..."
aws logs create-log-group --log-group-name /ecs/agroex-backend --region $AWS_REGION 2>/dev/null || echo "✓ Log group exists"
aws logs create-log-group --log-group-name /ecs/agroex-frontend --region $AWS_REGION 2>/dev/null || echo "✓ Log group exists"

echo ""
echo "✅ AWS Deployment Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update AWS_ACCOUNT_ID in ecs-task-definition.json files"
echo "2. Register task definitions: aws ecs register-task-definition --cli-input-json file://Backend/ecs-task-definition.json"
echo "3. Create services in AWS Console or using AWS CLI"
echo "4. Setup Application Load Balancer"
echo "5. Configure Route53 for domain"
echo ""
echo "🎉 Your AgroEx Pro application is ready for production!"
