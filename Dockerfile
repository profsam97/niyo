FROM node:18 AS buildnode
WORKDIR /usr/src/app
COPY package.json .
RUN  npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18
WORKDIR /usr/src/app
COPY --from=buildnode /usr/src/app .
EXPOSE 3000
CMD [ "npm", "start" ]