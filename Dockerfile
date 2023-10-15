# Base image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build app
RUN npm run build

# Serve app
ENTRYPOINT ["npm", "run", "serve"]