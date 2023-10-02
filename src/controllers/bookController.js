let books = [
  { _id: "1", title: "Nathan Cop" },
  { _id: "2", title: "Thomas Cop" },
  { _id: "3", title: "Declan Cop" },
  { _id: "4", title: "Aaron Cop" },
];

exports.checkId = (req, res, next) => {
  const id = req.params.id;
  if (id * 1 < 0) {
    return res.status(400).json({
      status: "fail",
      message: "invalid id",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const body = req.body;
  if (!body || !body.title) {
    return res.status(400).json({
      status: "fail",
      message: "bad request",
    });
  }
  next();
};

exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: "success",
    data: books,
  });
};

exports.getBook = (req, res) => {
  const book = books.find((el) => el._id === req.params.id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
};

exports.createBook = (req, res) => {
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

exports.updateBook = (req, res) => {
  const id = req.params.id;
  let isUpdate = false;
  // update
  books.forEach((el) => {
    if (el._id === id) {
      isUpdate = true;
      el.title = req.body.title;
    }
  });

  if (!isUpdate) {
    return res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: books.find((el) => el._id === id),
  });
};

exports.deleteBook = (req, res) => {
  const id = req.params.id;
  const book = books.find((el) => el._id === id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
  //delete
  books = books.filter((el) => el._id !== id);

  res.status(200).json({
    status: "success",
    data: book,
  });
};
