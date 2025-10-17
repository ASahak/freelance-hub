FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./libs ../libs

EXPOSE 5000

CMD [ "npm", "run", "start:dev", "@app/api-gateway" ]