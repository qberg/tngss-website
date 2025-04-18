FROM mhart/alpine-node
RUN npm install -g serve
EXPOSE 3001
WORKDIR /usr/local/lib/build
COPY ./build /usr/local/lib/build
#ENTRYPOINT [ "serve", "-p", "3001", "-s", "." ]
#ENTRYPOINT ["serve", "-p", "3001", "-s", ".", "--single"]
ENTRYPOINT [ "serve", "-p", "3001", "-s", "/usr/local/lib/build" ]