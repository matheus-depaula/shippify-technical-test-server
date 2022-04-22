FROM node:12.22.12-alpine

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install -g npm@8.5.4

RUN yarn

RUN yarn build

EXPOSE 3010

CMD [ "yarn", "start:prod" ]
