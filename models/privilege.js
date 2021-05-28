import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const privilegeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  privilege_name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true
  },
  privilege_desc: {
    type: String,
    required: false,
  },
  edit_time: {
    type: Date,
    required: false,
    validate: (value) => {
      return validator.isDate(value);
    },
    trim: true,
  },
});
const Privilege = mongoose.model("privilege", privilegeSchema, "privilege");
export { Privilege };
