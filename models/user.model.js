//jshint esversion:6
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    cart:{type:Array},
    firstName:{type:String},
    lastName:{type:String},
    phone:{type:Number},
    address:{type:String}
   },
)

const userModel = mongoose.model('user',UserSchema);

module.exports = userModel;
