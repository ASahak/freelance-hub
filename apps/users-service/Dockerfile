FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

COPY ./libs ../libs


EXPOSE 5001

CMD [ "npm", "run", "start:dev", "@app/users-service" ]