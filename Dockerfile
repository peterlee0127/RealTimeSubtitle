FROM alpine:latest
RUN apk add --no-cache  git nodejs  nodejs-npm
RUN git clone https://github.com/peterlee0127/RealTimeSubtitle
WORKDIR RealTimeSubtitle
RUN npm install
RUN npm run build
EXPOSE 8080
CMD  npm start
