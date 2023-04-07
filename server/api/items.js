const router = require("express").Router();
const {
  models: { Item },
} = require("../db");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const item = await Item.findOrCreate({
      where: { title: req.body.title, cartId: req.body.cartId },
      defaults: req.body,
    });
    const newItem = await Item.increment("quantity", {
      by: 1,
      where: { title: req.body.title, cartId: req.body.cartId },
    });
    console.log(newItem);
    res.status(201).send(newItem);
  } catch (error) {
    next(error);
  }
});
