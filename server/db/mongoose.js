var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("connect to DB");
  })
  .catch(err => {
    console.log("error:", err.message);
  });

module.exports = {
  mongoose
};
