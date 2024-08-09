FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

COPY . .

ENV VITE_API_BASE_URL=http://localhost:8080/api/

RUN npm run build

FROM nginx

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# npm run dev is the command to start the application in development mode
CMD ["nginx", "-g", "daemon off;"]