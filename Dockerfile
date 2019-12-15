FROM node:10 

ARG env

WORKDIR /app

ADD package.json /app

ADD src  /app/src

ADD config/${env}.json  /app/config/${env}.json

RUN npm install

RUN npm run prodBuild 

EXPOSE 443

CMD ["npm", "run", "prod"]