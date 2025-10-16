FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

COPY ./libs ../libs

RUN npx prisma generate

EXPOSE 5001

CMD [ "npm", "run", "start:dev", "@app/users-service" ]