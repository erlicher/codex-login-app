# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --only=production

# Copy the rest of the app code
COPY . .

# Create a non-root user (Alpine-compatible) and switch to it
RUN adduser -D appuser
USER appuser

# Expose the port the app runs on
EXPOSE 8080

# Start the app
CMD ["node", "index.js"]