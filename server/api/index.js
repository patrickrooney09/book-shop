const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/nyt", require("./nyt"));
router.use("/items", require("./items"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
