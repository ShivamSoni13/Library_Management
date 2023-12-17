const express = require("express");
const app = express();
const Port = 5000;
const userRoute = require("./routes/user");
const { MongoClient, ServerApiVersion } = require('mongodb');
// import { userRoute } from "./routes/user";
app.use(express.json());
app.use("/api", userRoute);
const uri = "mongodb+srv://libmgmt:12345@libmgmt.cynijla.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to Database Succesfully");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(Port, () => {
  console.log("server is listening at port " + Port);
});
