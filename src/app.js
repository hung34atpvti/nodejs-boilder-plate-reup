const express = require("express");
const morgan = require("morgan");

const bookRouter = require("./routes/bookRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // handle raw json type
app.use(express.static(`${__dirname}/../public`));

const greeting = (req, res) => {
  res.status(200).json({ message: "Hello world!", app: "Boiler plate" });
};

app.route("/").get(greeting);

app.use("/api/v1/book", bookRouter);

module.exports = app;
