import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  role: [{ type: Schema.Types.ObjectId, ref: "role" }],
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value);
    },
    trim: true,
  },
  first_name: {
    type: String,
    required: false,
    trim: true,
  },
  last_name: {
    type: String,
    required: false,
    trim: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  phone_number: {
    type: String,
    required: false,
    validate: (value) => {
      return validator.isMobilePhone(value);
    },
    trim: true,
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
const User = mongoose.model("user", userSchema, "user");
export { User };
