#!/bin/bash

echo "Removing any existing 'campfire' Docker image..."
docker rmi -f campfire 2>/dev/null || true

echo "Building the Docker image..."
docker build -t campfire .

echo "Running the Docker container..."
docker run -p 3000:3000 -v ~/campfire-data:/var/www/html/data campfire

echo "Docker container 'campfire' is now running on port 3000."
