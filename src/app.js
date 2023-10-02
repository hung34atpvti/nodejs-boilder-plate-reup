const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000; // change PORT here

app.use(morgan("dev"));
app.use(express.json()); // handle raw json type

let books = [
  { _id: "1", title: "Nathan Cop" },
  { _id: "2", title: "Thomas Cop" },
  { _id: "3", title: "Declan Cop" },
  { _id: "4", title: "Aaron Cop" },
];

const greeting = (req, res) => {
  res.status(200).json({ message: "Hello world!", app: "Boiler plate" });
};

const getAllBooks = (req, res) => {
  res.status(200).json({
    status: "success",
    data: books,
  });
};

const getBook = (req, res) => {
  const id = req.params.id;
  if (!id || !books || id < 0) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  const book = books.find((el) => el._id === id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
};

const createBook = (req, res) => {
  const bookLength = books.length + 1 + "";
  const bookReq = {
    _id: bookLength,
    title: req.body.title,
  };

  //create
  books.push(bookReq);

  res.status(201).json({
    status: "success",
    data: books.find((el) => el._id === bookLength),
  });
};

const updateBook = (req, res) => {
  const id = req.params.id;
  if (!id || !books || id < 0) {
    return res.status(400).json({
      status: "fail",
      message: "invalid id",
    });
  }

  let isUpdate = false;
  // update
  books.forEach((el) => {
    if (el._id === id) {
      isUpdate = true;
      el.title = req.body.title;
    }
  });

  if (!isUpdate) {
    return res.status(400).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: books.find((el) => el._id === id),
  });
};

const deleteBook = (req, res) => {
  const id = req.params.id;
  if (!id || !books || id < 0) {
    return res.status(400).json({
      status: "fail",
      message: "invalid id",
    });
  }

  const org = books.find((el) => el._id === id);
  if (!org) {
    return res.status(400).json({
      status: "fail",
      message: "invalid id",
    });
  }

  //delete
  books = books.filter((el) => el._id !== id);

  res.status(200).json({
    status: "success",
    data: org,
  });
};

app.route("/").get(greeting);
app.route("/book").get(getAllBooks).post(createBook);
app.route("/book/:id").get(getBook).put(updateBook).delete(deleteBook);

app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}`);
});
