const {router} = require('../connection');
const cartModel = require('../models/cart.model');
const iceItemModel = require('../models/iceitem.model');

router.route('/get-cart-items/').post(async(req, res)=>{
   let arr = [];
   const response = await cartModel.findOne({email:req.body.email});
   let promise = await response.cartItems.map(async(item,i)=>{
      console.log(item.productId)
      const id = await iceItemModel.findOne({_id:item.productId});
      console.log(id.iceName)
      arr.push({productId:item.productId, iceName:id.iceName, price:id.price, quantity:item.quantity})
   })
   Promise.all(promise).then(response=>{
       console.log(arr);
       res.json({arr:arr});
   })
});

module.exports = router;