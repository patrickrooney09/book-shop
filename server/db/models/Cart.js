const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./User");

const Cart = db.define("cart", {
  name: Sequelize.STRING,
});

module.exports = Cart;
