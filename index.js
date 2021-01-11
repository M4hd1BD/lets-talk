const express = require("express");
const path = require('path');
const expressEdge = require('express-edge');

// App setup
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
const app = express();
const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

// Static files
app.use(express.static("public"));

//set up edge
app.use(expressEdge);
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});
