FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src ./src
COPY ts*.json ./

RUN npm run tsc

EXPOSE 9000

ENV NODE_ENV=dev

CMD [ "npm", "start" ]