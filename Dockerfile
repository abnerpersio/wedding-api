FROM node:lts-alpine AS builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN npm config set cache /home/node/app/.npm-cache --global

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

RUN apk add git

USER node

RUN yarn

COPY . .

RUN yarn db:generate
RUN yarn build

COPY --chown=node:node . .

ENV PORT 8080
EXPOSE 8080

CMD [ "node", "dist/index.js" ]