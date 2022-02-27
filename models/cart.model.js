const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   email:{type:String},
   cartItems: 
      {  
         type:Array,
         productId:{type:String},
         quantity:{type:Number}
      }
   
})

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;