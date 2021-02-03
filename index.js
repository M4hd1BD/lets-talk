const path = require('path');
const express = require("express");
const app = express();
const { config, engine } = require('express-edge');
const edge = require("edge.js");
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
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const connectFlash = require("connect-flash");
const storePost = require('./middleware/storePost')
const logoutController = require("./controllers/logout");
const notFoundController = require("./controllers/notFound");
const postDashboardController = require("./controllers/postDashboard");
const toggleApprovalController = require("./controllers/toggleApproval");

// App setup
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}
config({ cache: process.env.NODE_ENV === 'production' });

const server = app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
mongoose.connect('mongodb://localhost/node-blog', {useNewUrlParser: true, useUnifiedTopology: true});
const mongoStore = connectMongo(expressSession);
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("voila!");
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.use(engine);
app.use(connectFlash());
app.use(fileUpload());
app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/:page", homePageController);
app.get("/create/new", auth, createPostController);
app.post("/create/store", auth, storePost, storePostController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);
app.get("/auth/register", redirectIfAuthenticated, createUserController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);
app.get("/dashboard/posts", postDashboardController);
app.post("/dashboard/toggleApproval", toggleApprovalController);
app.get("/*", notFoundController);
