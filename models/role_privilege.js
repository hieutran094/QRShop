import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const RolePrivilegeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role_id: [{ type: Schema.Types.ObjectId, ref: "role" }],
  privilege_id: [{ type: Schema.Types.ObjectId, ref: "user" }],
  edit_time: {
    type: Date,
    required: false,
    validate: (value) => {
      return validator.isDate(value);
    },
    trim: true,
  },
});
const RolePrivilege = mongoose.model("role_privilege", RolePrivilegeSchema, "role_privilege");
export { RolePrivilege };
