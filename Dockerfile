FROM node:18-bullseye as builder

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-bullseye as prod

WORKDIR /

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=builder /build /build

RUN npm ci --omit=dev

ENTRYPOINT [ "npm", "run", "prod" ]
