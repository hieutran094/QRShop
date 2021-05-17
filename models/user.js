import mongoose from 'mongoose';
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username: {
        type: String,
        required: true
      },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    phoneNumber: {
      type: String,
      required: false
    },
    editTime:{
      type:Date,
      required:false
    }
});
const User=mongoose.model('user',userSchema,'user');
export {User};