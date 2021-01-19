const path = require('path');
const express = require("express");
const app = express();
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/post');
const fileUpload = require("express-fileupload");

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
app.use(fileUpload());
app.set('views', __dirname + '/views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
        posts
    })
});

app.get('/posts/new', (req, res) => {
    res.render('create')
});

app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    })
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});

const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

mongoose.connect('mongodb://localhost/node-blog', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("voila!");
});
