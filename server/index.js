const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const app = express();
const port = 9000;

app.use(cors());
app.get("/help/idea/2018.3/HelpTOC.json", (request, response) => {
  setTimeout(() => {
    response.json(data);
  }, 3000);
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
