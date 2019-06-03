const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

var id = "5cf5074eee0ea43abcb76287";
if (!ObjectID.isValid(id)) {
  console.log("id not valid");
}

User.findById(id)
  .then(user => {
    if (!user) {
      return console.log("no user found with this id");
    }
    console.log("User:", user);
  })
  .catch(e => console.log(e));

// var id = "5cf55ebaf782732f38337882";
// if (!ObjectID.isValid(id)) {
//   console.log("id not valid");
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos:", todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("Todo:", todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("Id not found");
//     }
//     console.log("Todo By id:", todo);
//   })
//   .catch(e => console.log(e));
