variable "aws_region" {
  description = "AWS region to deploy infrastructure into."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Base name used for created AWS resources."
  type        = string
  default     = "shopsmart"
}

variable "environment" {
  description = "Environment suffix for resource names."
  type        = string
  default     = "dev"
}

variable "container_port" {
  description = "Port exposed by the backend container."
  type        = number
  default     = 5001
}

variable "container_cpu" {
  description = "Fargate task CPU units."
  type        = number
  default     = 256
}

variable "container_memory" {
  description = "Fargate task memory in MiB."
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Desired ECS task count."
  type        = number
  default     = 1
}

variable "lab_role_name" {
  description = "Existing IAM role name provided by the AWS learner lab."
  type        = string
  default     = "LabRole"
}
