FROM node:16-alpine

ENV PORT=8080

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]