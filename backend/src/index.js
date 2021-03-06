const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;
const { v4 } = require('uuid')

const apiRouter = require("./api/api");
const CLIENT_BULD_PATH = path.join(__dirname, '../../build')

const app = express();

app.use(express.static(CLIENT_BULD_PATH));

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.get('*', (req, res) => {
  this.response.sendFile(path.join(CLIENT_BULD_PATH));
})

app.listen(PORT, () => {
  console.log(`Linstening port ${PORT}`);
});

module.exports = app;

