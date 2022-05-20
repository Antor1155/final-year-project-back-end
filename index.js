const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ObjectId } = require('mongodb');



//cross origin resource sharing
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

//declearing mongodb
const uri = "mongodb+srv://antor:P6Lj59oNPHR31d0T@cluster0.itp5m.mongodb.net/?retryWrites=true&w=majority";;
const client = new MongoClient(uri);



// working with api and data collection 
async function run() {
  try {
    await client.connect();
    const attendenceCollection = client.db("systems").collection("attendence");
    const userCollection = client.db("systems").collection("users");




    ////api for getting all attendence
    app.get('/attendence', async (req, res) => {
      const query = {};
      const cursor = attendenceCollection.find(query);

      const products = await cursor.toArray();

      res.send(products);
    });

    //// api for getting all users
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);

      const products = await cursor.toArray();

      res.send(products);
    });

   


    ///// api for deleting one item 
    app.delete("/deleteUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    //////api for adding one item
    app.post("/addUser", async (req, res) => {
      const doc = req.body;
      const result = await userCollection.insertOne(doc);
      console.log(doc);
      res.send(result);
    })



  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);


app.listen(port, () => {
    console.log("listening to port: ", port);
})
