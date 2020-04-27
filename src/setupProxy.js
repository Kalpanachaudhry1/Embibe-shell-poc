const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/mf-ask',
        createProxyMiddleware({
          target: 'http://localhost:3001',
          changeOrigin: false,
        }),
    );
};
