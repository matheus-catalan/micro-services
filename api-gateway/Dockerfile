FROM node:15-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN apk add tzdata wget --no-progress \
    && echo "America/Sao_Paulo" > /etc/timezone

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz --quiet \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN apk del tzdata wget \
    && rm -rf /var/cache/apk/* \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

EXPOSE 3000

CMD [ "npm", "run",  "dev" ]
