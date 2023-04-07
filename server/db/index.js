//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Cart = require("./models/Cart");
const Item = require("./models/Item");

//associations could go here!

User.hasOne(Cart, {
  foriegnKey: "myCart",
});
Cart.belongsTo(User);

Cart.hasMany(Item);

module.exports = {
  db,
  models: {
    User,
    Cart,
    Item,
  },
};
