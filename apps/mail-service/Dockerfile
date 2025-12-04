FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./apps/mail-service/src/templates ./src/templates
COPY ./apps/mail-service/src/templates ./dist/templates

RUN npm install --save-optional @css-inline/css-inline-linux-x64-musl

COPY . .

COPY ./libs ../libs

EXPOSE 5003

CMD [ "npm", "run", "start:dev", "@app/mail-service" ]