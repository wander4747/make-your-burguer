FROM node:lts-alpine

RUN npm install -g @vue/cli json-server


# # make the 'app' folder the current working directory
WORKDIR /app

# # copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./


# # install project dependencies
RUN npm install

# # copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# # build app for production with minification
# RUN npm run build

ADD start.sh /
RUN chmod +x /start.sh

EXPOSE 8080
EXPOSE 3000

CMD ["/start.sh"]