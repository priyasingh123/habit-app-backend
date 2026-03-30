# Use Node base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Expose your backend port
EXPOSE 5000

# Start server
CMD ["npm", "start"]