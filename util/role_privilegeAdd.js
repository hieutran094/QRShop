import { Role } from "../models/role.js";
import { Privilege } from "../models/privilege.js";
import { RolePrivilege } from "../models/role_privilege.js";
import mongoose from "mongoose";
const urlConnect = `mongodb://localhost:27017/woodshop`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var rolePrivilege = new RolePrivilege({
    _id: new mongoose.Types.ObjectId(),
    edit_time: Date.now(),
  });
  (async function (rn, ur) {
    try {
      let r = await new Promise((resolve, reject) => {
        Role.find({ role_name: rn }, function (err, role) {
          if (err) reject(err);
          resolve(role);
        });
      });
      let p = await new Promise((resolve, reject) => {
        Privilege.find({ privilege_name: ur }, function (err, pl) {
          if (err) reject(err);
          resolve(pl);
        });
      });
      if (r && p) {
        console.log(r);
        console.log(p);
        rolePrivilege.role_id = r[0]._id;
        rolePrivilege.privilege_id = p[0]._id;
        let result = await new Promise((resolve, reject) => {
            rolePrivilege.save(function (err, userRole) {
            if (err) reject(err);
            resolve(userRole);
          });
        });
        console.log(rolePrivilege);
        if (result) console.log("successfully saved.");
      }
    } catch (err) {
      console.log(`Err: ${err}`);
    }
  })("administrator", "Dashboard");
});
