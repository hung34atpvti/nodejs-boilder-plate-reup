const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const port = process.env.PORT || 3000; // change PORT here

app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}`);
});
