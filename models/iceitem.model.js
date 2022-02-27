//jshint esversion:6
const mongoose = require('mongoose');
const iceItemSchema = new mongoose.Schema({
    iceName:{type:String, required:true, unique:true},
    category:{type:String,required:true},
    price:{type:Number, required:true}
},)

const iceItemModel = mongoose.model('product',iceItemSchema);

module.exports = iceItemModel;