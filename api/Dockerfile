FROM node:20-alpine

WORKDIR /

COPY . .

RUN npm i

RUN npm run build

COPY /training/datasets/ /dist/training/datasets/

EXPOSE 3000

CMD ["npm", "run", "serve"]