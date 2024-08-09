# FROM node:20 AS build-stage
# 
# 
# WORKDIR /usr/src/app
# 
# COPY . .
# 
# RUN npm ci
# 
# RUN npm run build
# 
# # Testing stage
# RUN npm test
# 
# # Production stage
# # This is a new stage, everything before this is gone, except for the files that we want to COPY
# FROM nginx:1.25-alpine
# 
# # COPY the directory dist from the build-stage to /usr/share/nginx/html
# # The target location here was found from the Docker hub page
# COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
# 
# # Nginx käyttää oletuksena porttia 80
# EXPOSE 80
# 
# # Käynnistä Nginx
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api/

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

# npm run dev is the command to start the application in development mode
CMD ["nginx", "-g", "daemon off;"]