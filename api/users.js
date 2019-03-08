module.exports = {
  login,
  checkSession,
  logout,
  getUsersList,
  createAccount,
  updateInfo,
  changeAccountStatus,
  resetPassword,
  updatePassword
};

const passport = require("passport");

const { User } = require("../models/user");

function login(req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    if (req.body.remember) {
      // Cookie expires after 14 days
      req.session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
    } else {
      // Cookie expires at end of session
      req.session.cookie.expires = false;
    }
    if (user) console.log({ user });
    if (info) console.log({ info });
    if (user && user.isDisabled) return res.status(404).json({ error: "This user is disabled" });
    if (error || !user) {
      console.log({ error });
      return res.status(403).json({ error });
    }

    req.login(user, error => {
      if (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ error });
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
}

function checkSession(req, res) {
  if (!req.user) return res.status(401).json({ error: "User session not found" });
  if (req.user.isDisabled) return res.status(404).json({ error: "This user is disabled" });
  return res.status(200).json({ user: req.user });
}

function logout(req, res) {
  req.logout();
  res.status(200).json({ response: "Logged out" });
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
    __v: 0
  }).exec((error, response) => res.json({ error, response }));
}

function createAccount(req, res) {
  const { ...userData } = req.body;
  const password = Math.random().toString(36).slice(2);
  User.createNew({ password, ...userData }, (error, user) => {
    if (error) return res.status(409).json({ error });
    let html = "";
    html += "You are registered in Alchemy.<br/><br/>";
    html += "Your login details:<br/>";
    html += `Email: ${req.body.email.toLowerCase()}<br/>`;
    html += `Password: ${password}<br/><br/>`;
    html += `<a href="${req.protocol}://${req.get("host")}/login">Alchemy</a>`;

    // sendEmail(req.body.email, "Account registration", html, res, userData)
  });
}

function updateInfo(req, res) {
  const { _id, ...userData } = req.body;
  // Remove empty fields
  Object.keys(userData).forEach(key => (userData[key] === null) && delete userData[key]);

  User.findByIdAndUpdate(
    _id,
    { $set: userData },
    { new: true },
    (error, response) => {
      res.json({ error, response });
    }
  );
}

function changeAccountStatus(req, res) {
  User.updateMany({
    _id: { $in: req.body.accounts },
    role: { $ne: "Admin" }
  },
  { $set: { isDisabled: !this.isDisabled }},
  (error, users) => {
    if (error) return res.status(500).json({ error })
    res.json({ response: users });
  });
}

function resetPassword(req, res) {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(500).json({ error });
    if (!user) return res.status(404).json({ error: "User not found" });
    user.password = Math.random().toString(36).slice(2);
    user.save(error => error && res.status(500).json({ error }));

    let html = "";
    html += `We have generated a new password for your account.<br/>`;
    html += `Your new password: ${user.password}<br/><br/>`;
    html += `<a href="${req.protocol}://${req.get("host")}/login">Alchemy</a>`;
    // sendEmail(req.body.email, "Your new password in Alchemy", html, res, req.body.email);
  });
}

function updatePassword(req, res) {
  const { _id, oldPassword, newPassword } = req.body;
  User.findById(_id).exec((error, user) => {
    if (error) return res.status(500).json({ error });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!user.checkPassword(oldPassword)) return res.status(422).json({ error: `Incorrect password` });
    user.password = newPassword;
    user.save(error => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({ response: "Password has been successfully changed" });
    });
  });
}
