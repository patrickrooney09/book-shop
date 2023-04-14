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

//delete item in user cart
router.delete("/:cartId/:itemId", async (req, res, next) => {
  try {
    console.log("REQ.PARAMS:", req.params);
    const cart = await Item.findAll({ where: { cartId: req.params.cartId } });

    let item = await cart.filter((currentBook) => {
      console.log(currentBook.id === Number(req.params.itemId));
      if (currentBook.id === Number(req.params.itemId)) {
        return currentBook;
      }
    });

    // const item = await Item.findByPk({
    //   where: { cartId: req.params.cartId, id: req.params.itemId },
    // });
    console.log(item[0]);

    await item[0].destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});
