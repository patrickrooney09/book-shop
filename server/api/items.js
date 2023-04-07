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
    console.log(req.body);
    const item = await Item.findOrCreate({
      where: { title: req.body.title },
      defaults: req.body,
    });
    res.status(201).send(item);
  } catch (error) {
    next(error);
  }
});
