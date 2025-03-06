FROM node:lts-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:mainline-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/html/
COPY ./data /data
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000

VOLUME [ "/var/www/html/data" ]

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]

