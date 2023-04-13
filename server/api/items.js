const router = require("express").Router();
const {
  models: { Item },
} = require("../db");

module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const items = await Item.findAll({ where: { cartId: req.params.id } });
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
    await Item.increment("quantity", {
      by: 1,
      where: { title: req.body.title, cartId: req.body.cartId },
    });
    console.log("NEW ITEM", item);
    res.status(201).send(item);
  } catch (error) {
    next(error);
  }
});
