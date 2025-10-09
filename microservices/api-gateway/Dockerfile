FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./


# --- Dependencies Stage ---
# This stage is only for installing dependencies. If package files haven't changed,
# Docker will use the cache for this layer, making builds much faster.
FROM base AS dependencies
# Install app dependencies
RUN npm install


# --- Development Stage ---
# This is the image we'll use for development, as specified in docker-compose.yml.
FROM dependencies AS development
# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .
# The command to start the app (`npm run dev`) will be provided by docker-compose.yml.


# --- Production Stage ---
# This stage builds the final, optimized production image. It's not used by
# your current docker-compose.yml, but it's ready for when you deploy.
FROM dependencies AS production
# Copy the rest of the application code
COPY . .
# Build the TypeScript application into JavaScript
RUN npm run build
# The command to start the production app would be different, e.g., CMD ["node", "dist/main"]