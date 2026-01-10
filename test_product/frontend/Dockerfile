FROM node:latest as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=$REACT_APP_API_URL npm run build


RUN npm run build

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]