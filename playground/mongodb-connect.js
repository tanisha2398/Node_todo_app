// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to mongo db server");
    }
    var db = client.db("TodoApp");
    console.log("connected to MongoDB server");

    // db.collection("Todos").insertOne(
    //   {
    //     text: "Something to do",
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("unable to inser todo", err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );
    // db.collection("Users").insertOne(
    //   {
    //     name: "Tanisha",
    //     age: 21,
    //     location: "Type-3/56-J"
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log("unable to add to User Collection");
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    //   }
    // );
    client.close();
  }
);
