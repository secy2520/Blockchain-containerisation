# Use Nginx image as a base image
FROM nginx:alpine
WORKDIR /app
# Copy the built React app from the build folder to the Nginx web server directory
COPY build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
