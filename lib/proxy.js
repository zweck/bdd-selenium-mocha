const https = require('https');
const url = require('url');
const httpProxy = require('http-proxy');

const config = require('../config.json');
const { APP_URL, ADMIN_USER, PROXY_PORT } = config;

const PORT = PROXY_PORT || 9009;

const host = url.parse(APP_URL).host;

module.exports = class Proxy {
  constructor() {
    this._auth_user = ADMIN_USER;
    this._proxyServer = null;
    // TODO: Why doesn't this bind?
    this._createProxyServer = this._createProxyServer.bind(this);
  }

  start(auth_user = ADMIN_USER) {
    this._auth_user = auth_user;
    this._createProxyServer();
  }

  stop() {
    if(this._proxyServer) {
      this._proxyServer.close();
    }
  }

  setUser(auth_user) {
    this._auth_user = auth_user;
  }

  _createProxyServer() {
    let self = this; // TODO: how do we bind 'this' instead?
    console.log(`Proxying requests for user ${this._auth_user}`);

    if(this._proxyServer) {
      console.warn('Proxy server already running');  
      return; 
    }

    this._proxyServer = httpProxy.createProxyServer({
      agent: https.globalAgent,
      target: APP_URL,
      headers: {
        host,
      }
    })
    .on('proxyReq', function(proxyReq, req, res, options) {
      proxyReq.setHeader('Accenture-Identity', self._auth_user);
    })
    .on('error', function(proxyRes, req, res) {
      console.log('error', proxyRes)
    })
    .listen(PORT);
  }
};
