module.exports = {
  getStats
};

const moment = require("moment");

const { Element } = require("../models/element");
const { User } = require("../models/user");

async function getStats(req, res, next) {
  const usersCount = await User.countDocuments({ isDisabled: false });
  const activeUsersCount = await User.countDocuments({
    isDisabled: false,
    lastEntered: {
      $gt: moment().startOf("month"),
      $lt: moment().endOf("month")
    }
  });
  const bannedUsersCount = await User.countDocuments({ isDisabled: true });
  const elementsCount = await Element.estimatedDocumentCount();

  const users = await User.find({}).lean();
  let discoveredElementsSet = new Set();
  users.map(user => {
    user.elements.map(el => discoveredElementsSet.add(el.toString()));
  });
  const undiscoveredElementsCount = elementsCount - discoveredElementsSet.size;

  res.status(200).json({
    usersCount,
    activeUsersCount,
    bannedUsersCount,
    elementsCount,
    undiscoveredElementsCount
  });
}
