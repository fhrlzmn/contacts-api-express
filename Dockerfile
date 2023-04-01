# Base image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build app
RUN npm run build

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose port
EXPOSE 8080

# Run app
CMD [ "npm", "run", "start" ]