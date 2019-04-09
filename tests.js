process.env.NODE_ENV = "test";
require("mongoose");

require("./test/users");
require("./test/categories");
require("./test/elements");
require("./test/stats");
require("./test/recipes");
