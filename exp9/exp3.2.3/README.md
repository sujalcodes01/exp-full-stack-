# Experiment 3.2.3 - AWS Deployment with Load Balancing

## Aim
Deploy a full-stack application on AWS with load balancing and auto-scaling.

## Objectives
1. Configure AWS infrastructure using Terraform.
2. Set up an Auto Scaling Group for ECS container instances.
3. Deploy a Dockerized application to ECS.
4. Route traffic through an Application Load Balancer.
5. Implement CI/CD using CodePipeline and CodeBuild.

## Project Structure
```text
.
|-- Dockerfile
|-- buildspec.yml
|-- package.json
|-- public/
|-- src/
`-- terraform/
```

## What This Experiment Builds
- A VPC spanning 2 Availability Zones
- 2 public subnets and 2 private subnets
- Internet Gateway and NAT Gateway
- Application Load Balancer
- ECS cluster on EC2 capacity
- Auto Scaling Group sized from 2 to 4 instances
- ECS service with task auto-scaling
- ECR repository for Docker images
- CodeBuild project for image builds
- CodePipeline pipeline for automated deployment

## Prerequisites
- AWS account
- AWS CLI configured with valid credentials
- Terraform 1.5+
- Docker 20.10+
- Node.js 20+
- A GitHub repository
- A pre-created AWS CodeStar connection to GitHub

## Run Locally
```bash
npm install
npm start
```

Open `http://localhost:3000`

## Terraform Deployment Steps
1. Copy `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars`.
2. Update the GitHub and CodeStar values.
3. Run the following:

```bash
cd terraform
terraform init
terraform fmt
terraform validate
terraform apply
```

## CI/CD Flow
1. Push code to the configured GitHub branch.
2. CodePipeline fetches the latest source.
3. CodeBuild builds the Docker image and pushes it to ECR.
4. CodePipeline deploys the new image to the ECS service.
5. The ALB keeps serving traffic during rolling updates for near zero downtime.

## Verification Commands
```bash
aws ecs describe-services --cluster <cluster-name> --services <service-name>
aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names <asg-name>
aws elbv2 describe-load-balancers --names <alb-name>
curl http://<alb-dns-name>/api/health
```

## Expected Output
- Highly available application across 2 AZs
- Load-balanced traffic through an ALB
- Auto-scaling from 2 to 4 ECS EC2 instances
- ECS service scaling based on CPU utilization
- Infrastructure managed through Terraform
- Automated deployment pipeline from GitHub to ECS

## Notes
- The pipeline depends on a valid `codestar_connection_arn`.
- Terraform will create billable AWS resources, especially NAT Gateway, ALB, EC2, and CodeBuild.
- If you want HTTPS, add an ACM certificate and an HTTPS listener to the ALB.
