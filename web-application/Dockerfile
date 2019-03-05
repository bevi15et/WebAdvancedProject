FROM node:11.9.0-stretch

EXPOSE 8080

WORKDIR /web-application

COPY package*.json ./

RUN npm install

COPY src src

CMD [ "npm", "run", "start" ]
