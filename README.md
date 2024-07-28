# Project Setup and Management with Docker

## Initial Setup

### 1. Start Docker Compose Service

If you don't have the dependencies installed, start the Docker Compose service:

```bash
docker compose up
```

### 2. Install Dependencies

Once the service is running, install the dependencies:

```bash
docker compose run --rm SERVICE_NAME npm install
```

This command will:

- Install the dependencies.
- Clone them from the container to the project.
- Delete the container created to just install the dependencies.

### 3. Build the Service

Build the service and run it in detached mode:

```bash
docker compose up -d --build
```

### 4. Run the Service

Run the service:

```bash
docker compose up -d
```

_-d will run the service in detached mode_

## Installing New Dependencies

To install any new dependency, you can use:

```bash
docker compose exec SERVICE_NAME COMMAND_TO_EXECUTE
```

Or use the script file in the repository:

```bash
scripts\docker-exec.bat COMMAND_TO_EXECUTE
```
