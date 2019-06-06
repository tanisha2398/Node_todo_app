const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "abc123";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword =
  "$2a$10$4ghImLZBfHTZRuqSM246pu/YBBDQOt6SNnZ1NL1IYSKWh6U9mpRU2";

bcrypt.compare("abc123", hashedPassword, (err, res) => {
  console.log(res);
});

// var data = {
//   id: 4
// };
// var token = jwt.sign(data, "123abc");
// console.log(token);
// var decoded = jwt.verify(token, "123abc");
// console.log("decoded", decoded);
// var message = "I am user number 3";

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

// if (resultHash === token.hash) {
//   console.log("data is not changed");
// } else {
//   console.log("data changed dont trust");
// }
