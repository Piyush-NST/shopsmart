# ShopSmart AWS Deployment

This repo is set up to deploy the backend to AWS ECS Fargate through GitHub Actions and to point the frontend at the backend with a Vite secret.

## Required GitHub Secrets

Add these in `Settings -> Secrets and variables -> Actions`:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`
- `VITE_API_BASE_URL`

`LabRole` is used by the Terraform stack for ECS task execution and task permissions, which fits the default AWS Academy learner lab setup.

## Workflow Order

The ECS pipeline in [.github/workflows/ecs-deploy.yml](/Users/piyush/shopsmart/.github/workflows/ecs-deploy.yml:1) runs in this order:

1. Test backend and frontend, then upload test reports.
2. Initialize, validate, plan, and apply Terraform.
3. Build the backend Docker image and push it to ECR.
4. Register a new ECS task definition and deploy it to ECS Fargate.

Pull requests stop after testing and Terraform planning. Pushes to `main` continue through deployment.

## Infrastructure

Terraform in [infra/terraform](/Users/piyush/shopsmart/infra/terraform/main.tf:1) provisions:

- A unique S3 bucket with versioning, encryption, and public access blocked
- An ECR repository for the backend image
- A VPC with public subnets
- An Application Load Balancer
- An ECS cluster for Fargate deployments
- CloudWatch logging for the backend service

## Frontend API URL

The frontend reads `VITE_API_BASE_URL`. Set the `VITE_API_BASE_URL` GitHub secret to the ECS backend URL after the first deployment, or update it whenever the ALB URL changes.
