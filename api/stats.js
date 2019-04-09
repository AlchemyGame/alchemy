module.exports = {
  getStats
};

const moment = require("moment");

const { Element } = require("../models/element");
const { User } = require("../models/user");

async function getStats(req, res, next) {
  const elements = await Element.estimatedDocumentCount();
  const users = await User.countDocuments({ isDisabled: false });
  const activeUsers = await User.countDocuments({
    isDisabled: false,
    lastEntered: {
      $gt: moment().startOf("month"),
      $lt: moment().endOf("month")
    }
  });
  const bannedUsers = await User.countDocuments({ isDisabled: true });

  res.status(200).json({
    usersCount: users,
    activeUsersCount: activeUsers,
    bannedUsersCount: bannedUsers,
    // discoveredElementsCount: discoveredElements
    elementsCount: elements
  });
}
