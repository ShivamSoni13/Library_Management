const express = require("express");
const app = express();
const Port = 5000;
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
// import { userRoute } from "./routes/user";
app.use(express.json());
app.use("/api", userRoute);
const uri =
  "mongodb+srv://libmgmt:12345@libmgmt.cynijla.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("database is connected successfully on -> " + uri);
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(Port, () => {
  console.log("server is listening at port " + Port);
});
