# app/back_end/Dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apt-get update -y && apt-get install -y openssl

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
