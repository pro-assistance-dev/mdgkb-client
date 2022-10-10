FROM node:lts-alpine as develop-stage

WORKDIR /app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @vue/cli
ENV HOST 0.0.0.0
EXPOSE 8080

CMD ["npm", "run", "serve"]