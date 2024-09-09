FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 6060
EXPOSE 6061

CMD [ "node", "./bin/www" ]