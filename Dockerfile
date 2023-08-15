FROM node:18

WORKDIR /LignumsoftPizzaBackend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]