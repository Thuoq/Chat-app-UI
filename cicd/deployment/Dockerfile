FROM node:14-alpine

ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /front-end

COPY ./package.json .
COPY ./yarn.lock .
# Install dependencies
RUN yarn install

