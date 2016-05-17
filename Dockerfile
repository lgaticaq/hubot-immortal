FROM mhart/alpine-node

MAINTAINER Jorge Epuñan

RUN apk add --no-cache curl

# NPM dependencies (cache)
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

ADD . /opt/app
WORKDIR /opt/app

CMD ["npm", "start"]
