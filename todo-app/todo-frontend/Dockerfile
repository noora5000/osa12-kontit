FROM node:20 AS build-stage

ENV VITE_BACKEND_URL=http://localhost:3000

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# Testing stage
RUN npm test

# Production stage
# This is a new stage, everything before this is gone, except for the files that we want to COPY
FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html
# The target location here was found from the Docker hub page
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Nginx käyttää oletuksena porttia 80
EXPOSE 80

# Käynnistä Nginx
CMD ["nginx", "-g", "daemon off;"]