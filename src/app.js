const express = require("express");

const app = express();
const port = 3000; // change PORT here

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world!", app: "Boiler plate" });
});

app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}`);
});
