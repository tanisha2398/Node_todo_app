var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp", {
  useNewUrlParser: true
});

//create model

var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var User = mongoose.model("User", {
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  }
});
var newUser = new User({});

newUser.save().then(
  doc => {
    console.log(JSON.stringify(doc, undefined, 2));
  },
  e => {
    console.log("Unable to add user");
  }
);

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

// var newTodo = new Todo({
//   text: "   Edit this video   "
// });

// newTodo.save().then(
//   doc => {
//     console.log(JSON.stringify(doc, undefined, 2));
//   },
//   e => {
//     console.log("Unable to add new todo");
//   }
// );
