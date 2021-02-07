# Stage 1 - the build process
FROM node:alpine as builder

RUN mkdir -p /usr/src/builder

WORKDIR /usr/src/builder

ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

COPY . .

RUN yarn install --production
RUN yarn run build
RUN rm -rf node_modules


# Stage 2 - the production environment
FROM keymetrics/pm2:latest-alpine
LABEL author="Godkoz Money Book"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder /usr/src/builder/build /usr/src/app/build
COPY --from=builder /usr/src/builder/server /usr/src/app/server

RUN rm -rf /usr/src/builder

EXPOSE 80

CMD ["pm2-runtime", "start", "./server/index.js"]

