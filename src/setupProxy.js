const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/mf-jobs',
        createProxyMiddleware({
          target: 'http://localhost:3001',
          changeOrigin: false,
        }),
    );
};
