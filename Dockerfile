FROM node:lts AS builder

RUN npm config set cache /home/node/app/.npm-cache --global

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install

COPY . .

RUN yarn db:generate
RUN yarn build

ENV PORT 80
EXPOSE 80

CMD [ "node", "dist/index.js" ]