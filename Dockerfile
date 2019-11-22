FROM node:10 

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 443

CMD ["npm", "run", "prod"]
