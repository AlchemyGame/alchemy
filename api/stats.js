module.exports = {
  getStats
};

const { Element } = require("../models/element");
const { User } = require("../models/user");

async function getStats(req, res, next) {
  const elements = await Element.estimatedDocumentCount();
  const users = await User.countDocuments({ isDisabled: false });

  res.json({
    usersCount: users,
    // discoveredElementsCount: discoveredElements
    elementsCount: elements
  });
}
