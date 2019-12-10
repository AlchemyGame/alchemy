process.env.NODE_ENV = "test";
require("mongoose");

const chai = require("chai");

chai.should();
chai.use(require("chai-http"));
chai.use(require("chai-like"));
chai.use(require("chai-things"));

require("./test/users");
require("./test/categories");
require("./test/elements");
require("./test/stats");
require("./test/recipes");
require("./test/anonymousUser");
