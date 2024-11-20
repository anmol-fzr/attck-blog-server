FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm i -g typescript
COPY . .

RUN apt-get -y update
RUN apt-get -y install curl

CMD ["npm", "run", "dev"]
