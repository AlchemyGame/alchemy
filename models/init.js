const { Category } = require("../models/category");
const { Element } = require("../models/element");
const { User } = require("../models/user");

async function initCollections() {
  if (process.env.NODE_ENV === "test") return;

  async function createCategory() {
    const category = await Category.findOne({}).lean();
    if (category) return category;
    const newCategory = new Category({ name: "Elements" });
    return await newCategory.save();
  }

  async function createElements(category) {
    const elements = await Element.find({}).lean();
    if (elements && elements.length !== 0) return elements;
    const newElements = [
      { name: "Air", category },
      { name: "Earth", category },
      { name: "Fire", category },
      { name: "Water", category }
    ];
    return await Element.insertMany(newElements);
  }

  async function createAdmin() {
    const user = await User.findOne({ username: "Admin" }).lean();
    if (user) return user;

    const newUser = {
      email: "admin@test.com",
      username: "Admin",
      role: "Admin",
      password: "1"
    };
    User.createNew(newUser, (error, user) => {
      if (error) console.log({ error });
      return user;
    });
  }

  const category = await createCategory();
  await createElements(category);
  createAdmin();
}

module.exports = { initCollections };
