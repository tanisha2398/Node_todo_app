const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect(
  "mongodb://localhost/27017",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to mongoDB server");
    }
    var db = client.db("TodoApp");
    console.log("connected to MongoDB server");

    //deleteMny
    //   db.collection("Todos")
    //     .deleteMany({ text: "eat lunch" })
    //     .then(result => {
    //       console.log(result);
    //     });

    //deleteone
    //   db.collection("Todos")
    //     .deleteOne({ text: "eat lunch" })
    //     .then(result => {
    //       console.log(result);
    //     });

    // db.collection("Users")
    //   .deleteMany({ name: "Tanisha" })
    //   .then(result => {
    //     console.log(result);
    //   });
    db.collection("Users")
      .findOneAndDelete({ _id: new ObjectID("5cf3b1a6425fe362d4118d67") })
      .then(result => {
        console.log(JSON.stringify(result, undefined, 2));
      }); //find one and delete
    // db.collection("Todos")
    //   .findOneAndDelete({ completed: false })
    //   .then(res => {
    //     console.log(result);
    //   });
  }
);
