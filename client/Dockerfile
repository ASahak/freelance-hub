# --- Base Stage ---
# Use an official Node.js runtime. Let's use the current LTS version.
FROM node:20-alpine AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# --- Dependencies Stage ---
FROM base AS dependencies
RUN npm install

# --- Development Stage ---
# This image will be used for local development with hot-reloading.
FROM dependencies AS development
COPY . .
# The command to start the app will be provided by docker-compose.

