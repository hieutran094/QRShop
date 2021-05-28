import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role_id: [{ type: Schema.Types.ObjectId, ref: "role" }],
  user_id: [{ type: Schema.Types.ObjectId, ref: "user" }],
  edit_time: {
    type: Date,
    required: false,
    validate: (value) => {
      return validator.isDate(value);
    },
    trim: true,
  },
});
const UserRole = mongoose.model("user_role", UserRoleSchema, "user_role");
export { UserRole };
