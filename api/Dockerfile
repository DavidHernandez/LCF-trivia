FROM node:lts-alpine

RUN npm install -g npm

WORKDIR /api

COPY package.json package-lock.json /app/
RUN npm install

COPY . /api
CMD [ "npm", "run", "start" ]
