FROM mhart/alpine-node:8.6

EXPOSE 3000

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . /app

CMD npm run start
