FROM node:20-alpine
ENV NODE_ENV=development

WORKDIR /app

COPY ./React/pokemon-app/ /app/
RUN npm install axios
RUN npm install react-table
RUN npm install
CMD ["npm", "start"]