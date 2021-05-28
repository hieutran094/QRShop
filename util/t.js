import { User } from "../models/user.js";
import { Role } from "../models/role.js";
import { UserRole } from "../models/user_role.js";
import { Privilege } from "../models/privilege.js";
import mongoose from "mongoose";
const urlConnect = `mongodb://localhost:27017/woodshop`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log("Connect successfully!!");

  (async function (un) {
    try {
      let result = await Role.find({});
      if (result) {
        console.log(`Result:${JSON.stringify(result, null, 4)}`);
        // console.log(`url:${result.role.length}`);
        if (result.length > 0) {
          // result[0].forEach(element => {
          //   console.log(`url:${element}`);
          // });
          for (var item in result[0]) {
            console.log(`url:${item}`);
          }
        }
      }
    } catch (err) {
      console.log(`Err: ${err}`);
    }
  })("root");
});
