import { Role } from "../models/role.js";
import { Privilege } from "../models/privilege.js";
import mongoose from "mongoose";
const urlConnect = `mongodb://localhost:27017/woodshop`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var role = new Role({
    _id: new mongoose.Types.ObjectId(),
    role_name: "guest",
    privilege: [],
    role_describe: "Guest",
    edit_time: Date.now(),
  });
  (async function (pl) {
    try {
      let p = await new Promise((resolve, reject) => {
        Privilege.find({ privilege_name: pl }, function (err, pp) {
          if (err) reject(err);
          resolve(pp);
        });
      });
      if (p.length>0) {
        console.log(p);
        role.privilege = p[0]._id;
      }
      let result = await new Promise((resolve, reject) => {
        role.save(function (err, r) {
          if (err) reject(err);
          resolve(r);
        });
      });
      if (result) console.log("successfully saved.");
    } catch (err) {
      console.log(`Err: ${err}`);
    }
  })("");
  // role.save(function (err) {
  //   if (err) throw err;
  //   console.log("role successfully saved.");
  // });
});
