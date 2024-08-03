FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY .env ./

EXPOSE 3000

CMD ["yarn", "start"]
