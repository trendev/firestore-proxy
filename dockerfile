FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY src .
COPY ts*.json ./

RUN npm run tsc

EXPOSE 9000