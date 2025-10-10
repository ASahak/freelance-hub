FROM node:20-alpine AS base

WORKDIR /usr/src/app


# --- Dependencies Stage ---
FROM base AS dependencies
COPY ./users-service/package.json ./users-service/package-lock.json ./
RUN npm install


# --- Development Stage ---
FROM dependencies AS development
COPY ./users-service .
COPY ./libs ./libs

