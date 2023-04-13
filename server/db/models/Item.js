const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  price: Sequelize.STRING,
  book_image: Sequelize.STRING,
  quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
});

module.exports = Item;
