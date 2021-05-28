import { User } from "../models/user.js";
import { Role } from "../models/role.js";
import mongoose from "mongoose";
const urlConnect = `mongodb://localhost:27017/woodshop`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: "management",
    status: 1,
    level: 0,
    role: [],
    password: "123",
    email: "qrshop_admin@gmail.com",
    first_name: "content",
    last_name: "admin",
    address: "Ha Noi",
    phone_number: "0147",
    edit_time: Date.now(),
  });
  (async function (pl) {
    try {
      let p = await new Promise((resolve, reject) => {
        Role.find({ role_name: pl }, function (err, pp) {
          if (err) reject(err);
          resolve(pp);
        });
      });
      if (p.length>0) {
        console.log(p);
        user.role = p[0]._id;
      }
      let result = await new Promise((resolve, reject) => {
        user.save(function (err, r) {
          if (err) reject(err);
          resolve(r);
        });
      });
      if (result) console.log("successfully saved.");
    } catch (err) {
      console.log(`Err: ${err}`);
    }
  })("administrator");
  // user.save(function (err) {
  //   if (err) throw err;
  //   console.log("role successfully saved.");
  // });
});
