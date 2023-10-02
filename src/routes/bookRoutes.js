const express = require("express");
const bookController = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.param("id", bookController.checkId);

bookRouter
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.checkBody, bookController.createBook);
bookRouter
  .route("/:id")
  .get(bookController.getBook)
  .put(bookController.checkBody, bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = bookRouter;
