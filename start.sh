#!/bin/sh

# Wait for background processes on shutdown
trap 'kill $(jobs -p)' EXIT

# Start Spring Boot application in the background
java -jar app.jar &

# Wait a bit for Spring Boot to start
sleep 10

# Start Nginx in the foreground
exec nginx -g 'daemon off;'