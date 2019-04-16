const nodemailer = require("nodemailer");
const config = require("../config");
const transporter = nodemailer.createTransport(config.nodemailer);

const sendEmail = (to, subject, html, res, userData = null) => {
  const data = {
    from: "Alchemy <noreply@alchemy.game>",
    to,
    subject,
    html
  };
  transporter.sendMail(data, (error, info) => {
    const response = {};
    if (userData) response.user = userData;
    if (error) {
      console.log({ error });
      response.error = "Server completed the request, but mailer is not available";
    } else {
      console.log({ info });
      response.mailer = "Email has been sent";
    }
    return res.status(200).json(response);
  });
};

module.exports = { sendEmail };
