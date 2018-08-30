FROM mhart/alpine-node:8.6

EXPOSE 3000

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

CMD npm run start
