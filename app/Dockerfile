FROM node:lts-alpine

RUN npm install -g npm

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY . /app
CMD [ "npm", "run", "watch"  ]

