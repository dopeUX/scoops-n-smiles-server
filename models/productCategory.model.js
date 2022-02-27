//jshint esversion:6
const mongoose = require('mongoose');

const productCategory = new mongoose.Schema({
   category : {type:String, required:true}
});

const productCategoryModel = mongoose.model('productCategory',productCategory);
module.exports = productCategoryModel;