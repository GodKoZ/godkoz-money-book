FROM keymetrics/pm2:latest-alpine
LABEL author="Godkoz Money Book"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/build

CMD ["pm2-runtime", "start", "bundle.js"]