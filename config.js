console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

let overwriteConfig = require("./config.dev");

if (process.env.NODE_ENV === "test") {
  overwriteConfig = require("./config.test");
}

module.exports = {
  appPort: "7540",
  mongoUrl: "mongodb://localhost/alchemy",
  ...overwriteConfig
};
