const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/Chart/GrafikPenjualan.php",
    createProxyMiddleware({
      target: "http://localhost/kampung-rasa/server/controllers",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log("Request made to:", req.url);
      },
      onError: (err, req, res) => {
        console.error("Error occurred:", err);
      },
    })
  );
  app.use(
    "/Chart/GrafikIncome.php",
    createProxyMiddleware({
      target: "http://localhost/kampung-rasa/server/controllers",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log("Request made to:", req.url);
      },
      onError: (err, req, res) => {
        console.error("Error occurred:", err);
      },
    })
  );
  app.use(
    "/Customer/HandleDataCustomer.php",
    createProxyMiddleware({
      target: "http://localhost/kampung-rasa/server/controllers",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log("Request made to:", req.url);
      },
      onError: (err, req, res) => {
        console.error("Error occurred:", err);
      },
    })
  );
};
