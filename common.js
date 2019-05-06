module.exports = {
  addExpressMiddleware,
};

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const bodyParser = require("body-parser");
const compression = require("compression");

const config = require("./config");
const { User } = require("./models/user");
const { initCollections } = require("./models/init");

const multer = require("multer");
const upload = multer();

mongoose.connect(config.mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

const MongoStore = require("connect-mongo")(session);

config.session.store = new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 14 * 24 * 60 * 60
});
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
initCollections();

passport.use(
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, User.authorize.bind(User))
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    return done(null, user);
  });
});

function addExpressMiddleware(app) {
  if (app.get("env") !== "test") app.use(morgan("dev"));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(upload.any());
  app.use(session(config.session));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression());
}
