FROM node:16-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 6062

CMD [ "node", "./bin/www" ]


#RUN mkdir -p /home/node/app/node_modules

##RUN mkdir /home/node/app

##WORKDIR /home/node/app

##COPY package*.json ./

##RUN npm install

#COPY --chown=node:node . .

##EXPOSE 6062

#CMD [ "node", "./bin/www" ]
