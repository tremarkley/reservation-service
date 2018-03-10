FROM node:latest

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
RUN npm run seed
RUN npm run build


EXPOSE 3002
CMD [ "npm", "start" ]