import { Role } from "../models/role.js";
import { User } from "../models/user.js";
import { UserRole } from "../models/user_role.js";
import mongoose from "mongoose";
const urlConnect = `mongodb://localhost:27017/woodshop`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var userRole = new UserRole({
    _id: new mongoose.Types.ObjectId(),
    edit_time: Date.now(),
  });
  (async function (rn,ur) {
    try {
      await new Promise((resolve, reject) => {
        userRole.save(function (err, userRole) {
          if (err) reject(err);
          resolve(userRole);
        });
      });
      let r = await new Promise((resolve, reject) => {
        Role.find({ role_name: rn }, function (err, role) {
          if (err) reject(err);
          resolve(role);
        });
      });
      let u = await new Promise((resolve, reject) => {
        User.find({ username: ur }, function (err, user) {
          if (err) reject(err);
          resolve(user);
        });
      });
      if (r && u) {
        console.log(r);
        console.log(u);
        userRole.role_id = r[0]._id;
        userRole.user_id = u[0]._id;
        console.log(userRole);
        userRole.save(function (err, ur) {
          if (err) throw err;
          console.log("role successfully saved.");
        });
      }
    } catch (err) {
      console.log(`Err: ${err}`);
    }
  })("guest","test");
});
