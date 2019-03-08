const nodemailer = require("nodemailer");
const config = require("../config");
const transporter = nodemailer.createTransport(config.nodemailer);

const sendEmail = (to, subject, html, res) => {
  const data = {
    from: "Alchemy <noreply@alchemy.game>",
    to,
    subject,
    html
  };
  transporter.sendMail(data, (error, info) => {
    if (error) return res.status(500).json({ error });
    console.log({ info });
  });
};

module.exports = { sendEmail };
