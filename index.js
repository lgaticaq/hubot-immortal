'use strict';

const http = require('http');
const path = require('path');
const curl = require('curlrequest');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('express-error-handler');
const leveldb = require('levelup');
const Promise = require('bluebird');

const db = leveldb(path.join(__dirname, 'db'));

Promise.promisifyAll(Object.getPrototypeOf(db));
Promise.promisifyAll(curl);

const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
const timeOut = 600000; // every 6 minutes

const getHosts = () => db.getAsync('hosts').then(JSON.parse).catch(() => []);

const saveHost = url => {
  return getHosts().then(hosts => {
    if (!hosts.find(x => x === url)) hosts.push(url);
    hosts = JSON.stringify(hosts);
    return db.putAsync('hosts', hosts);
  });
};

const pingHosts = () => getHosts().then(hosts => Promise.all(hosts.map(x => curl.requestAsync(x))));

// get all hosts
app.get('/', (req, res, next) => {
  getHosts().then(hosts => res.json(hosts)).catch(next);
});

// post new host
app.post('/', (req, res, next) => {
  saveHost(req.body.url).then(() => res.sendStatus(200)).catch(next);
});

// error handler
app.use(errorHandler({server: server}));

server.listen(3000);

setInterval(() => {
  pingHosts().then(console.log).catch(console.log); // eslint-disable-line
}, timeOut);
