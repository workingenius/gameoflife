FROM node:4.8.0
MAINTAINER Nathan Hardy <workingenius@163.com>

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN npm install
RUN npm install brunch

EXPOSE 8080

RUN npm run build
CMD npm run run-server
