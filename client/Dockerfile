FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# RUN npm run build

ENV NODE_ENV production


EXPOSE 3000

# CMD [ "npx", "serve", "-s", "build" ]
CMD [ "npm", "start" ]

