FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 6063

CMD [ "node", "./bin/www" ]