# Stage 1: Build the React + Vite app
FROM node:alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Expose port 80
# EXPOSE 80

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf
