const express = require("express");
const app = express();
const Port = 5000;

app.listen(Port, () => {
  console.log("server is listening at port " + Port);
});
