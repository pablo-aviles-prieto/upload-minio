#!/bin/bash

# Check if a command was provided
if [ -z "$1" ]; then
  echo "Usage: docker-exec.sh command"
  exit 1
fi

# Run the provided command inside the upload-minio container
echo "Running command inside upload-minio container: $*"
docker compose exec upload-minio "$@"
