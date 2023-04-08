FROM node:16-alpine3.16

WORKDIR /home/app

COPY . ./

CMD ["yarn", "start"]