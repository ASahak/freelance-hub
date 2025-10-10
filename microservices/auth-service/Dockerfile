FROM node:20-alpine AS base

WORKDIR /usr/src/app


# --- Dependencies Stage ---
FROM base AS dependencies
COPY ./auth-service/package.json ./auth-service/package-lock.json ./
RUN npm install


# --- Development Stage ---
FROM dependencies AS development
COPY ./auth-service .
COPY ./libs ./libs

