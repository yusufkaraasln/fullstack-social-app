
FROM node:19-alpine


WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]