import mongoose from "mongoose";
import validator from 'validator';
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  rolename: {
    type: String,
    required: true,
    trim: true
  },
  editTime: {
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
