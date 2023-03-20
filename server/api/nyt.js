const { default: axios } = require("axios");

const router = require("express").Router();
// const { models: { User }} = require('../db')
module.exports = router;
//allows us to use env variables
require("dotenv").config();

router.get("/", async (req, res, next) => {
  try {
    // const nytKey = { hello: process.env.NYT_API_KEY };
    // res.json(nytKey);
    const options = {
      method: "GET",
      url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`,
    };
    axios.request(options).then((response) => {
      res.json(response.data);
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // const nytKey = { hello: process.env.NYT_API_KEY };
    // res.json(nytKey);
    const options = {
      method: "GET",
      url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`,
    };
    axios.request(options).then((response) => {
      res.json(response.data);
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:bookId", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`,
    };
    axios.request(options).then((response) => {
      res.json(response.data.results.books[req.params.bookId]);
    });

    // else {
    //   res.sendStatus(404);
    // }
  } catch (error) {
    next(error);
  }
});
