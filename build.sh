#!/bin/bash

echo "Building container image using jib"
./mvnw package -Pprod -DskipTests verify jib:dockerBuild