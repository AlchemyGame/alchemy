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
    if (error) {
      if (error.code === "EAUTH") {
        console.log("MAILER: Wrong credentials");
        return res.status(500).json({ error: "Data has been updated but mailer is not available" });
      }
      return res.status(500).json({ error });
    }
    console.log({ info });
    return res.status(201).json({ response: "Successful registration" });
  });
};

module.exports = { sendEmail };
