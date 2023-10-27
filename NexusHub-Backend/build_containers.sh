#!/bin/bash

CONTAINER_DIRS=($(find Microservices/ -mindepth 1 -maxdepth 1 -type d))

# Loop through each directory and build the container
for dir in "${CONTAINER_DIRS[@]}"; do
  # Extract the directory name from the full path
  container_name=$(basename "${dir}")
  
  echo "Building container in ${container_name,,}..."
  docker build -t "${container_name,,}" "${dir}"
  echo "Container in ${container_name,,} built successfully."
done