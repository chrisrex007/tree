const express = require("express");
const items = require("./items.json");
const godowns = require("./godowns.json");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  console.log("server sent the data.");
  res.send({ items, godowns });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
