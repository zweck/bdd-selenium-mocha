const https = require('https');
const url = require('url');
const httpProxy = require('http-proxy');
require('dotenv').config();

const PORT = process.env.PROXY_PORT || 9009;

const HOST = url.parse(process.env.APP_URL).host;
const IS_SECURE = url.parse(process.env.APP_URL).protocol === 'https';

module.exports = class Proxy {
  constructor({ user } = { user: process.env.ADMIN_USER }) {
    this._auth_user = user;
    this._proxyServer = null;
  }

  start() {
    this._createProxyServer();
  }

  stop() {
    if(this._proxyServer) {
      this._proxyServer.close();
    }
  }

  set user(user) {
    this._auth_user = user;
  }

  _createProxyServer() {
    if(this._proxyServer) {
      console.warn('Proxy server already running');  
      return; 
    }

    this._proxyServer = httpProxy.createProxyServer({
      agent: https.globalAgent,
      target: process.env.APP_URL,
      headers: {
        HOST,
      }
    });

    if (IS_SECURE) {
      this._proxyServer.agent = https.globalAgent;
    }

    this._proxyServer.on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('Accenture-Identity', this._auth_user);
    })
    .on('error', (proxyRes) => {
      console.error('error', proxyRes);
    })
    .listen(PORT);
  }
};
