# BUILD

FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json /app/

COPY . .

RUN npm run build


# PRODUCTION
# SERVE BUILD WITH NGINX

FROM nginx:stable-alpine AS production

COPY  --from=build /app/dist  /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx","-g","daemon off" ]
