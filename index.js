const express = require("express");
const app = express();
const Port = 5000;
const userRoute = require("./routes/user");
// import { userRoute } from "./routes/user";
app.use(express.json());
app.use("/api", userRoute);

app.listen(Port, () => {
  console.log("server is listening at port " + Port);
});
