FROM node:lts-alpine AS builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

RUN apk add git
USER node

RUN yarn

COPY . .

RUN yarn db:generate
RUN yarn ts:check
RUN yarn build

FROM node:lts-alpine AS final

WORKDIR /home/node/app

COPY --from=builder /home/node/app/dist/ dist/
COPY --from=builder /home/node/app/prisma/ prisma/
COPY --from=builder /home/node/app/package.json package.json

ENV PORT 8080
EXPOSE 8080

CMD [ "node", "dist/index.js" ]