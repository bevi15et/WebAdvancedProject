FROM 10.15.1
EXPOSE 8080
WORKDIR /shop
COPY package*.json ./
RUN npm istall
COPY src/app.js src/
CMD npm run start