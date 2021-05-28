import mongoose from "mongoose";
import validator from 'validator';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  role_name: {
    type: String,
    required: true,
  },
  privilege: [{ type: Schema.Types.ObjectId, ref: "privilege" }],
  role_describe: {
    type: String,
    required: false
  },
  edit_time: {
    type: Date,
    required: false,
    validate: (value) => {
      return validator.isDate(value);
    },
    trim: true
  },
});
const Role = mongoose.model("role", roleSchema, "role");
export { Role };
