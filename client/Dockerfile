# --- Base Stage ---
FROM node:20-alpine AS base

WORKDIR /usr/src/app


# --- Dependencies Stage ---
FROM base AS dependencies
# Copy the package files from this service's specific folder
COPY ./api-gateway/package.json ./api-gateway/package-lock.json ./
RUN npm install


# --- Development Stage ---
FROM dependencies AS development
# Copy this service's source code and the shared libs folder
COPY ./api-gateway/ .
COPY ./libs ./libs


# --- Production Build Stage ---
FROM dependencies AS production-builder
# Copy this service's source code and the shared libs folder
COPY ./api-gateway/ .
COPY ./libs ./libs
RUN npm run build


# --- Production Runtime Stage ---
FROM base AS production
WORKDIR /usr/src/app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy only the necessary files from the previous stages
COPY --from=production-builder /usr/src/app/dist ./dist
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=production-builder /usr/src/app/package.json ./package.json

USER nestjs

CMD ["node", "dist/main"]

