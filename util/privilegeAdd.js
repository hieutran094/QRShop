import { Privilege } from "../models/privilege.js";
import mongoose from "mongoose";
const urlConnect = `mongodb://localhost:27017/woodshop`;

// Connect to database
mongoose.connect(urlConnect, { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log("Connect successfully!!");

  var privilege = new Privilege({
    _id: new mongoose.Types.ObjectId(),
    privilege_name: "usermanager",
    url: "/admin/users",
    privilege_desc: "UserManager",
    edit_time: Date.now(),
  });

  privilege.save(function (err) {
    if (err) throw err;
    console.log("privilege successfully saved.");
  });
});
