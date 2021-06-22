const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

app.use('/', serveStatic(path.join(__dirname, '/dist')));
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'service-worker.js'));
});
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
