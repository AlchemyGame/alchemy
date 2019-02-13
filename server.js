const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");

const config = require("./config");
const api = require("./routes/api");
const clientIndex = path.join(__dirname, "public/index.html");

const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || config.appPort;

const mongoDB = config.mongoUrl;

mongoose.set("useCreateIndex", true);
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const upload = multer();

app.use(morgan("dev"));
app.use(upload.any());
app.use("/api", api);

app.get("*", (req, res, next) => {
  res.sendFile(clientIndex);
});

app.set("port", PORT);

app.listen(app.get("port"), () => {
  console.log(`Server is up and running on port ${PORT}`);
});
