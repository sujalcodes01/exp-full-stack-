variable "project_name" {
  description = "Prefix used for resource naming."
  type        = string
  default     = "exp-3-2-3"
}

variable "aws_region" {
  description = "AWS region for the deployment."
  type        = string
  default     = "ap-south-1"
}

variable "github_owner" {
  description = "GitHub account or organization name."
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name."
  type        = string
}

variable "github_branch" {
  description = "GitHub branch monitored by CodePipeline."
  type        = string
  default     = "main"
}

variable "codestar_connection_arn" {
  description = "Existing CodeStar connection ARN for GitHub."
  type        = string
}

variable "container_port" {
  description = "Application container port."
  type        = number
  default     = 3000
}

variable "instance_type" {
  description = "EC2 instance type for ECS capacity."
  type        = string
  default     = "t3.micro"
}

variable "desired_capacity" {
  description = "Default number of ECS container instances."
  type        = number
  default     = 2
}

variable "min_capacity" {
  description = "Minimum number of ECS EC2 instances."
  type        = number
  default     = 2
}

variable "max_capacity" {
  description = "Maximum number of ECS EC2 instances."
  type        = number
  default     = 4
}
