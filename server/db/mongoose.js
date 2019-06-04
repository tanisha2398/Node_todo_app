var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://tanishanegipro:tanisha23@cluster0-y8fdu.mongodb.net/test?retryWrites=true&w=majority" ||
      "mongodb://localhost:27017/TodoApp",
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("connect to DB");
  })
  .catch(err => {
    console.log("error:", err.message);
  });

module.exports = {
  mongoose
};
