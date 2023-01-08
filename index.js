const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://Rasel:vr4Z7nzat2cHjIkT@cluster0.xhi7r.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const myCollection = client.db("myServices").collection("service");
async function run() {
  await client.connect();

  app.get("/home", async (req, res) => {
    const query = {};
    const result = await myCollection.find(query).toArray();
    res.send(result);
  });

  app.get("/details/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };

    const result = await myCollection.findOne(query);
    res.send(result);
  });
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("rasel connect db");
});
app.listen(port, () => {
  console.log("listen db to", port);
});
