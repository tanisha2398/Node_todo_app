var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp", {
  useNewUrlParser: true
});

//create model

var Todo = mongoose.model("Todo", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// var newTodo = new Todo({
//   text: "Cook Dinner"
// });

// newTodo.save().then(
//   doc => {
//     console.log("saved todo", doc);
//   },
//   e => {
//     console.log("Unable to save todo");
//   }
// );

var newTodo = new Todo({
  text: "Feed Pet",
  completed: true,
  completedAt: 1234
});

newTodo.save().then(
  doc => {
    console.log(JSON.stringify(doc, undefined, 2));
  },
  e => {
    console.log("Unable to add new todo");
  }
);
