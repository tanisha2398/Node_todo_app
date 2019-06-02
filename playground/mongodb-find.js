const { MongoClient, ObjectID } = require("mongodb");
MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log("Unable to connect to the mongoDB server");
    }
    var db = client.db("TodoApp");
    console.log("connected to mongoDB server");

    // db.collection("Todos")
    //   .find()
    //   .count()
    //   .then(
    //     count => {
    //       console.log(`todos count:${count}`);
    //     },
    //     err => {
    //       console.log("unable to fetch todos");
    //     }
    //   );
    db.collection("Users")
      .find({ name: "Tanisha" })
      .toArray()
      .then(
        res => {
          console.log("users=");
          console.log(JSON.stringify(res, undefined, 2));
        },
        err => {
          console.log("not able to fetch user");
        }
      );
    //   db.close();
  }
);
