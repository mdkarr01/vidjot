require("dotenv").config();
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require("connect-flash");
const path = require("path");
var Idea = require('./models/Idea');
var User = require("./models/User");

//LOAD ROUTES
const ideaRoutes = require("./routes/ideas");
const userRoutes = require("./routes/users");


// MLAB CONFIG
var uri = process.env.DBLOGIN;

// var uri = 'mongodb://mdkarr01:flexfire@ds263837.mlab.com:63837/vidjot';

mongoose.Promise = global.Promise;

mongoose
  .connect(uri)
  .then(() => console.log('Db Connected'))
  .catch(err => console.log(err));

//HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//STATIC PARSER
var dir = path.join(__dirname, "/public");
app.use(express.static(dir));

// var dir = path.join(__dirname, "/public"); app.use(express.static(dir));
app.use(methodOverride("_method"));

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(require("express-session")({
  secret: "Nellie is a baby girl",
  resave: true,
  saveUninitialized: true
}));

//FLASH MESSAGING
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// PASSPORT CONFIGURATION LANDING ROUTE
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

//ABOUT ROUTE
app.get('/about', (req, res) => {
  res.render('about');
});

app.use("/ideas", ideaRoutes);
app.use("/users", userRoutes);

//=====================================================================

app.listen(5000 || process.env.PORT, process.env.IP, () => {
  console.log('The Vidjot Server Has Started Port 5000!');
});