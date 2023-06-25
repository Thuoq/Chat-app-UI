FROM node:14-alpine

ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /front-end

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./
# Install dependencies
RUN yarn install

COPY . .

RUN yarn build

RUN rm -rf ./src
EXPOSE 3015
CMD ["yarn", "preview"]

