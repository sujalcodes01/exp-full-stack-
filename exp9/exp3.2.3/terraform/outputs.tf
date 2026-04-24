output "alb_dns_name" {
  description = "Public URL for the deployed application."
  value       = aws_lb.app.dns_name
}

output "ecr_repository_url" {
  description = "ECR repository that stores the container image."
  value       = aws_ecr_repository.app.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name."
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name."
  value       = aws_ecs_service.app.name
}

output "codepipeline_name" {
  description = "CodePipeline pipeline name."
  value       = aws_codepipeline.app.name
}
