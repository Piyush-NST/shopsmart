output "artifact_bucket_name" {
  description = "Versioned and encrypted S3 bucket name created for project artifacts."
  value       = aws_s3_bucket.artifacts.bucket
}

output "aws_region" {
  description = "AWS region used by the stack."
  value       = var.aws_region
}

output "ecr_repository_name" {
  description = "ECR repository name for the backend image."
  value       = aws_ecr_repository.backend.name
}

output "ecr_repository_url" {
  description = "ECR repository URL for the backend image."
  value       = aws_ecr_repository.backend.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name."
  value       = aws_ecs_cluster.backend.name
}

output "ecs_service_name" {
  description = "ECS service name the workflow should create or update."
  value       = local.ecs_service_name
}

output "ecs_task_family" {
  description = "ECS task definition family for backend deployments."
  value       = local.ecs_task_family
}

output "backend_container_name" {
  description = "Container name used in the ECS task definition."
  value       = local.backend_container_name
}

output "backend_container_port" {
  description = "Container port exposed by the backend service."
  value       = var.container_port
}

output "backend_desired_count" {
  description = "Desired ECS service task count."
  value       = var.desired_count
}

output "backend_task_cpu" {
  description = "CPU units used by the ECS task definition."
  value       = var.container_cpu
}

output "backend_task_memory" {
  description = "Memory used by the ECS task definition."
  value       = var.container_memory
}

output "backend_log_group_name" {
  description = "CloudWatch Logs group name for backend tasks."
  value       = aws_cloudwatch_log_group.backend.name
}

output "backend_service_url" {
  description = "Public backend URL exposed by the application load balancer."
  value       = "http://${aws_lb.backend.dns_name}"
}

output "ecs_subnet_ids" {
  description = "Public subnet IDs used by the ECS service."
  value       = [for subnet in aws_subnet.public : subnet.id]
}

output "ecs_security_group_id" {
  description = "Security group ID attached to ECS tasks."
  value       = aws_security_group.ecs_tasks.id
}

output "alb_target_group_arn" {
  description = "Target group ARN for the backend service."
  value       = aws_lb_target_group.backend.arn
}

output "ecs_task_execution_role_arn" {
  description = "LabRole ARN used as the ECS task execution role."
  value       = data.aws_iam_role.lab_role.arn
}

output "ecs_task_role_arn" {
  description = "LabRole ARN used as the ECS task role."
  value       = data.aws_iam_role.lab_role.arn
}
