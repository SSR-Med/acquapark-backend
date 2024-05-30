FROM node:20.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the project
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/index.js" ]