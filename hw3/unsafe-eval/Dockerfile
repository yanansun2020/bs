FROM node:8
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

RUN echo "TEST_FLAG" > /flag
RUN chown -R root:node /flag
RUN chmod -R 740 /flag

EXPOSE 8080

USER node
CMD ["npm", "start" ]