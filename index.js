const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
