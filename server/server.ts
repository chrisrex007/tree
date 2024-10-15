const express = require("express");
const items = require("./items.json");
const godowns = require("./godowns.json");
const cors = require("cors");

const app = express();
const port = 3000;

const validCredentials = {
  email: "person@gmail.com",
  password: "mypass23",
};
const validEmailDomain = "@gmail.com";

app.use(cors());
app.use(express.json());

app.get("/api/data", (req, res) => {
  console.log("server sent the data.");
  res.send({ items, godowns });
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (
    (email === validCredentials.email &&
      password === validCredentials.password) ||
    email.endsWith(validEmailDomain)
  ) {
    res.send({ success: true });
  } else {
    res.send({
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
