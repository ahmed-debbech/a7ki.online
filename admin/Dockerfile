FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 6064

CMD [ "node", "./bin/www" ]