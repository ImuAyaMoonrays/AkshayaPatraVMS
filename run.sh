#!/bin/bash

echo "Starting the containers"
if [ -x "$(command -v docker-compose)" ]; then
    docker-compose -f src/main/docker/app.yml up
elif [ -x "$(command -v docker compose)" ]; then
    docker compose -f src/main/docker/app.yml up
else
    echo "Could not find a valid docker or docker-compose installation\n"
    exit 1
fi