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
    const item = await Item.create({
      defaults: {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        book_image: req.body.book_image,
        quantity: req.body.quantity,
      },
    });

    res.status(201).send(item);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    //possibly delete the saved variable
    console.log("REQUEST OBJECT", req.body);
    const item = await Item.findAll({
      where: { title: req.body.title, cartId: req.body.cartId },
    });
    await Item.increment("quantity", {
      by: 1,
      where: { title: req.body.title, cartId: req.body.cartId },
    });
    await Item.decrement("quantity", {
      by: 1,
      where: { title: req.body.title, cartId: req.body.cartId },
    });
    console.log(item);
    if (item[0].quantity === 0) {
      console.log("DESTROYED?");
      await item[0].destroy();
    }
    res.status(201).send(item);
  } catch (error) {
    next(error);
  }
});

//delete item in user cart
router.delete("/:cartId/:itemId", async (req, res, next) => {
  try {
    const cart = await Item.findAll({ where: { cartId: req.params.cartId } });

    let item = await cart.filter((currentBook) => {
      if (currentBook.id === Number(req.params.itemId)) {
        return currentBook;
      }
    });

    await item[0].destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});
