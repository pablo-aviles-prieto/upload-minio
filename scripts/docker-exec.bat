@echo off
if "%1"=="" (
  echo Usage: docker-exec.bat command
  exit /b 1
)

echo Running command inside upload-minio container: %*
docker compose exec upload-minio %*
