module.exports = {
  login,
  checkSession,
  logout,
  resetPassword,
  getUsersList,
  createAccount,
  changeAccountInfo,
  changeAccountStatus,
  changeAccountRole,
  changeAccountPassword,
  getUserElements,
  addUserElement
};

const passport = require("passport");

const { User } = require("../models/user");
const { Element } = require("../models/element");
const { sendEmail } = require("./mail");

function updateActivity(user, next) {
  User.findById(user._id, (err, account) => {
    if (err) console.log("Activity update error", err);
    account.lastEntered = new Date();
    account.save(err => {
      if (err) console.log("Activity update error", err);
      next();
    });
  });
}

function login(req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    if (req.body.remember) {
      // Cookie expires after 14 days
      req.session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
    } else {
      // Cookie expires at end of session
      req.session.cookie.expires = false;
    }
    // if (user) console.log({ user });
    // if (info) console.log({ info });
    if (user && user.isDisabled) return res.status(404).json({ error: "This user is disabled" });
    if (error || !user) {
      // console.log({ error });
      return res.status(403).json({ error });
    }

    req.login(user, error => {
      if (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ error });
      }
      delete user.hashedPassword;
      delete user.salt;
      delete user.elements;
      updateActivity(user, next);
      return res.status(200).json({ user });
    });
  })(req, res, next);
}

function checkSession(req, res) {
  if (!req.user) return res.status(200).json({ error: "User session not found" });
  if (req.user.isDisabled) return res.status(200).json({ error: "This user is disabled" });
  req.user = req.user.toObject();
  delete req.user.hashedPassword;
  delete req.user.salt;
  delete req.user.elements;
  return res.status(200).json({ user: req.user });
}

function logout(req, res) {
  req.logout();
  res.status(200).json({ response: "Logged out" });
}

function resetPassword(req, res) {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(500).json({ error });
    if (!user) return res.status(404).json({ error: "User not found" });
    const password = Math.random().toString(36).slice(2);
    user.password = password;
    user.save(error => error && res.status(500).json({ error }));

    let html = "";
    html += `We have generated a new password for your account.<br/>`;
    html += `Your new password: ${password}<br/><br/>`;
    html += `<a href="${req.protocol}://${req.get("host")}/login">Alchemy</a>`;
    sendEmail(req.body.email, "Your new password in Alchemy", html, res);
  });
}

function getUsersList(req, res) {
  let statusQuery = {};
  if (req.query.status === "active") {
    statusQuery = { isDisabled: false };
  } else if (req.query.status === "disabled") {
    statusQuery = { isDisabled: true };
  }
  let roleQuery = {};
  if (req.query.role === "user") {
    roleQuery = { isDisabled: false, role: "User" };
  } else if (req.query.role === "admin") {
    roleQuery = { isDisabled: false, role: "Admin" };
  }

  User.find({ ...statusQuery, ...roleQuery }, {
    salt: 0,
    hashedPassword: 0,
    elements: 0,
    __v: 0
  }).lean().exec((error, response) => {
    if (error) return res.status(500).json({ error });
    res.json({ response });
  });
}

function createAccount(req, res) {
  const { ...userData } = req.body;
  if (!userData.password) {
    userData.password = Math.random().toString(36).slice(2);
  }
  userData.role = "User";
  User.createNew(userData, (error, user) => {
    if (error) return res.status(409).json({ error });
    let html = "";
    html += "You are registered in Alchemy.<br/><br/>";
    html += "Your login details:<br/>";
    html += `Email: ${userData.email.toLowerCase()}<br/>`;
    html += `Password: ${userData.password}<br/><br/>`;
    html += `<a href="${req.protocol}://${req.get("host")}/login">Alchemy</a>`;
    sendEmail(req.body.email, "Account registration", html, res, user);
  });
}

function changeAccountInfo(req, res) {
  const { _id, ...userData } = req.body;
  // Remove empty fields
  Object.keys(userData).forEach(key => (userData[key] === null) && delete userData[key]);
  // Remove role field
  if (userData.role) delete userData.role;
  if (userData.password) delete userData.password;
  if (userData.elements) delete userData.elements;

  const isCurrentUser = _id === req.user._id;
  const isAdmin = req.user.role === "Admin";
  if (isCurrentUser || isAdmin) {
    User.findByIdAndUpdate(
      _id,
      { $set: userData },
      { new: true },
      (error, user) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({ user });
      }
    );
  } else {
    return res.status(403).json({ error: "You are not allowed to perform this action" });
  }
}

function changeAccountStatus(req, res) {
  const { _id } = req.body;
  User.findById(_id).exec((error, user) => {
    if (error) return res.status(500).json({ error });
    if (user.role === "Admin") return res.status(403).json({ error: "You are not allowed to disable administrator accounts" });

    user.isDisabled = !user.isDisabled;
    user.save(error => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ user });
    });
  });
}

function changeAccountRole(req, res) {
  const { _id, role } = req.body;
  User.findById(_id).exec((error, user) => {
    if (error) return res.status(500).json({ error });
    if (user.isDisabled) return res.status(400).json({ error: "You can not change status of disabled accounts" });

    user.role = role;
    user.save(error => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ user });
    });
  });
}

function changeAccountPassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  User.findById(req.user._id).exec((error, user) => {
    if (error) return res.status(500).json({ error });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.checkPassword(oldPassword)) return res.status(422).json({ error: "Incorrect password" });
    user.password = newPassword;
    user.save(error => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ response: "Password has been successfully changed" });
    });
  });
}

function getUserElements(req, res) {
  // Using current user _id
  User.findById(req.user._id).lean().exec((error, user) => {
    if (error) return res.status(500).json({ error });
    Element.find({ _id: { $in: user.elements }}, "-__v").lean().exec((error, elements) => {
      if (error) return res.status(500).json({ error });
      res.status(200).json({ elements });
    });
  });
}

function addUserElement(req, res) {
  const { elementId } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { elements: elementId } },
    { new: true },
    error => {
      if (error) return res.status(500).json({ error });
      Element.findById(elementId, "-__v").lean().exec((error, element) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({ element });
      });
    }
  );
}
