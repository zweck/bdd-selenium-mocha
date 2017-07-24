const http = require('http');
const httpProxy = require('http-proxy');
const config = require('./config.json');

const { APP_URL, AUTH_USER } = config;

//
// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', (proxyReq, req, res, options) => {
  proxyReq.setHeader('Accenture-identity', AUTH_USER);
});

var server = http.createServer((req, res) => {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: APP_URL
  });
});

console.log("listening on port 443")
server.listen(443);
