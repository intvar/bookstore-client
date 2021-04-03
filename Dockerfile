FROM node:12.18.3 AS build-stage

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile

ENV NODE_ENV=production

COPY . .
RUN yarn run build

FROM nginx:1.19.2-alpine AS prod-stage

COPY --from=build-stage /app/build /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf

