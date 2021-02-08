# Stage 1 - the build process
FROM node:alpine as builder
LABEL stage=builder

RUN mkdir -p /usr/src/builder

WORKDIR /usr/src/builder

ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

COPY . .

RUN yarn install --production
RUN yarn run build


# Stage 2 - the production environment
FROM keymetrics/pm2:latest-alpine
LABEL author="Godkoz Money Book"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder /usr/src/builder/build /usr/src/app/build
COPY --from=builder /usr/src/builder/server /usr/src/app/server

WORKDIR /usr/src/app/server

RUN yarn install --production

CMD ["pm2-runtime", "start", "index.js"]

