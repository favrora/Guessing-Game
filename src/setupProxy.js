const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: process.env.REACT_APP_SOCKET_URL || 'http://localhost:8080',
      changeOrigin: true,
      ws: true,
    })
  );
};
