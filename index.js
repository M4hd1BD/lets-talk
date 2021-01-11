const path = require('path');
const express = require("express");
const app = express();
const { config, engine } = require('express-edge');

// App setup
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
config({ cache: process.env.NODE_ENV === 'production' });

// Static files
app.use(express.static('public'));

//set up edge
app.use(engine);

app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
