const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config");
const api = require("./routes/api");

const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || config.appPort;

const mongoDB = config.mongoUrl;

mongoose.set("useCreateIndex", true);
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", api);

app.set("port", PORT);

app.listen(app.get("port"), () => {
  console.log(`Server is up and running on port ${PORT}`);
});
