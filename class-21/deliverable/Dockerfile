FROM node:16-alpine
WORKDIR /app

RUN apk --no-cache add curl
RUN apk --no-cache add bash

COPY package.json package-lock.json .
RUN npm install pm2@latest -g
RUN npm install forever -g
RUN npm install 0x -g

RUN npm install
COPY . .
EXPOSE ${PORT_ENV}

CMD node --inspect server.js
# CMD 0x server.js
# CMD pm2-runtime start server.js --watch -- --PORT ${ARG_PORT} --MODE ${ARG_MODE}
# CMD forever server.js --PORT ${ARG_PORT} --MODE ${ARG_MODE}
# CMD npm run dev -- --PORT ${ARG_PORT} --MODE ${ARG_MODE}