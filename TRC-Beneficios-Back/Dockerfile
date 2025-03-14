FROM node:20.15-alpine

WORKDIR /app-backend

COPY package* .

RUN npm install 
RUN npm install pm2@latest -g

COPY . .
RUN npm run build

ENTRYPOINT [ "pm2-runtime"]
CMD [ "./build/server.js" ]