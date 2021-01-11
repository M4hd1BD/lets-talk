const express = require("express");
const path = require('path');

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

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
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
