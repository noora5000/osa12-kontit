FROM node:20

WORKDIR /usr/src/app

#COPY --chown=node:node . .

# Kopioi package.json ja package-lock.json, jotta välimuisti käytetään
COPY package*.json ./

RUN npm ci

#ENV DEBUG=playground:*

COPY . .

ENV NODE_ENV=production

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]