const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;
const config = require("../config");

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  },
  hashedPassword: {
    type: String
  },
  salt: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto
    .createHmac("sha1", this.salt)
    .update(config.appSalt)
    .update(password)
    .digest("hex");
};

schema.virtual("password")
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(() => this._plainPassword);

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(email, password, done) {
  const User = this;
  email = email.toLowerCase();

  User.findOne({ email }, (err, user) => {
    if (err) console.log({err});
    if (user) {
      if (user.checkPassword(password)) {
        user = user.toObject();
        delete user.hashedPassword;
        delete user.salt;
        return done(null, user);
      }
    }
    return done("User has not been authorized");
  });
};

schema.statics.createNew = function(obj, done) {
  const User = this;
  obj.email = obj.email.toLowerCase();

  User.findOne({ email: obj.email }, (err, user) => {
    if (err) console.log({ err });
    if (user) {
      done("Email already exists");
    } else {
      user = new User(obj);
      user.save(err => {
        if (err) return done(err);
        if (user) {
          user = user.toObject();
          delete user.hashedPassword;
          delete user.salt;
        }
        done(null, user);
      });
    }
  });
};

const User = exports.User = mongoose.model("User", schema);

if (process.env.NODE_ENV === "test") return;

User.findOne({}, (err, usr) => {
  if (err) console.log({err});
  if (!usr) {
    User.createNew({
      email: "admin@test.com",
      username: "Admin",
      role: "Admin",
      password: "1"
    }, (err, user) => {
      console.log({ err, user });
    });
  }
});
