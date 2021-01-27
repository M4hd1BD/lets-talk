const path = require('path');
const express = require("express");
const app = express();
const { config, engine } = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const auth = require("./middleware/auth");

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
mongoose.connect('mongodb://localhost/node-blog', {useNewUrlParser: true, useUnifiedTopology: true});
const mongoStore = connectMongo(expressSession);
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

const storePost = require('./middleware/storePost')
app.use('/posts/store', storePost)

app.get("/", homePageController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", storePostController);
app.get("/post/:id", getPostController);
app.get("/auth/register", createUserController);
app.post("/users/register", storeUserController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);

const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("voila!");
});
