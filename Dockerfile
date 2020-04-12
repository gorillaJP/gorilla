FROM node:10 

ARG env

WORKDIR /app

ADD package.json /app

ADD tsconfig.json /app

ADD .babelrc /app

ADD src  /app/src

ADD emails /app/emails

ADD config/${env}.json  /app/config/${env}.json

RUN npm install

#RUN npm install -g typescript

RUN npm run prodBuild 

EXPOSE 443

CMD ["npm", "run", "prod"]