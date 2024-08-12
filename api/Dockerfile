FROM node:20-alpine

WORKDIR /

COPY . .

RUN npm i

RUN npm run build

ENV NODE_ENV=production
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=3000

EXPOSE 3000

CMD ["npm", "run", "serve"]