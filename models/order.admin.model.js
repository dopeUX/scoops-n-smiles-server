const mongoose = require('mongoose');

const orderAdminSchema = new mongoose.Schema({
        email:{type:String},
        name:{type:String},
        orderStatus:{type:String},
        phone:{type:Number},
        address:{type:String},
        time:{type:String},
        cartTotal:{type:String},
        cartItems :
          {
             productId:{type:String},
             quantity:{type:String},
          },
          
        
});

const orderAdminModel = mongoose.model('ordersAdmin', orderAdminSchema);

module.exports = orderAdminModel;