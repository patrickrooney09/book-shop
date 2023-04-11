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
    //possibly delete the saved variable
    const item = await Item.findOrCreate({
      where: { title: req.body.title, cartId: req.body.cartId },
      // defaults: req.body,
      defaults: {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        book_image: req.body.book_image,
      },
    });
    const newItem = await Item.increment("quantity", {
      by: 1,
      where: { title: req.body.title, cartId: req.body.cartId },
    });
    res.status(201).send(newItem);
  } catch (error) {
    next(error);
  }
});
