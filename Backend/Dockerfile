FROM node:latest

WORKDIR /app

COPY ./package.json /app/

RUN npm config set registry https://registry.npmmirror.com

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["node", "bin/www"] 