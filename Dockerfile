FROM mhart/alpine-node

RUN npm install -g serve

EXPOSE 3001
WORKDIR /usr/local/lib/penClient

ENTRYPOINT [ "serve", "-p", "3001", "-s", "/usr/local/lib/build" ]
