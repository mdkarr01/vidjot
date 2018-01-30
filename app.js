require("dotenv").config();
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();

//LOAD ROUTES
const ideaRoutes = require("./routes/ideas");
const userRoutes = require("./routes/users");

//PASSPORT CONFIG
require("./config/passport")(passport);

//If using config/database for production and dev databases
// const db = require('./config/database');

// MLAB CONFIG
var uri = process.env.DBLOGIN;

mongoose.Promise = global.Promise;

mongoose
  .connect(uri)
  .then(() => console.log("Db Connected"))
  .catch(err => console.log(err));

//HANDLEBARS MIDDLEWARE
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//STATIC PARSER
var dir = path.join(__dirname, "/public");
app.use(express.static(dir));

app.use(methodOverride("_method"));

//BODY PARSER MIDDLEWARE
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(
  require("express-session")({
    secret: "Nellie is a baby girl",
    resave: true,
    saveUninitialized: true
  })
);

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//FLASH MESSAGING
app.use(flash());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//  LANDING ROUTE
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

//ABOUT ROUTE
app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/ideas", ideaRoutes);
app.use("/users", userRoutes);

//=====================================================================

app.listen(process.env.PORT, process.env.IP || 5000, () => {
  console.log("The Vidjot Server Has Started Port 5000!");
});

// app.listen(5000 || process.env.PORT, process.env.IP || 5000, () => {
//   console.log("The Vidjot Server Has Started Port 5000!");
// });
