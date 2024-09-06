FROM node:18-alpine AS base
COPY . /app

# deps
WORKDIR /app
COPY . ./
RUN npm i

# Build
RUN npm run build

CMD ["npm", "run", "start"]
