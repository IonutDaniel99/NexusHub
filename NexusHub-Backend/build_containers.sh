#!/bin/bash

# List of directories containing Dockerfiles
CONTAINER_DIRS=("Console" "Onboarding" "Weather")

# Loop through each directory and build the container
for dir in "${CONTAINER_DIRS[@]}"; do
  echo "Building container in "${dir,,}"..."
  docker build -t "${dir,,}" "Microservices/$dir"
  echo "Container in "${dir,,}" built successfully."
done