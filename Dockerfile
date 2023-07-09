FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm run build

COPY . .

ENV PORT=8091 PORT=8092 PORT=8093 PORT=8094 PORT=8095 PORT=8096

EXPOSE 8091 8092 8093 8094 8095 8096

CMD [ "npm", "run", "start"]
