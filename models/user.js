const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;
const config = require("../config");

const { Category } = require("../models/category");
const { Element } = require("../models/element");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User"
  },
  elements: [{
    type: Schema.Types.ObjectId,
    ref: "Element"
  }],
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
  lastEntered: {
    type: Date,
    default: null
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

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

schema.statics.authorize = function(email, password, done) {
  const User = this;
  const query = validateEmail(email) ? { email } : { username: email };

  User.findOne(query, (err, user) => {
    if (err) console.log({ err });
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

  User.findOne({ email: obj.email }, async (err, user) => {
    if (err) console.log({ err });
    if (user) return done("Email already exists");

    user = new User(obj);
    const basicCategory = await Category.findOne({ name: "Elements" }).lean();
    const basicElements = await Element.find({ category: basicCategory }).lean();
    user.elements = basicElements.map(element => element._id);

    user.save(err => {
      if (err) return done(err);
      if (user) {
        user = user.toObject();
        delete user.hashedPassword;
        delete user.salt;
      }
      done(null, user);
    });
  });
};

exports.User = mongoose.model("User", schema);
