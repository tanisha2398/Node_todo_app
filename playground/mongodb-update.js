const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to mongodb server");
    }
    var db = client.db("TodoApp");
    console.log("Connected to MongoDB server");

    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     { _id: new ObjectID("5cf42e859627156793d35675") },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   });

    db.collection("Users")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5cf431e6189d3e48901e4269")
        },
        {
          $inc: { age: 1 },
          $set: { name: "Tan" }
        },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });
  }
);
