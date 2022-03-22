FROM node:lts-alpine3.15

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir -p /app/node_modules
RUN chown node:node /app/node_modules

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY . ./

CMD ["npm", "start"]
