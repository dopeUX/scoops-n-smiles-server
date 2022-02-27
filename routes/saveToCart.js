
const {router} = require('../connection');
const cartModel = require('../models/cart.model');
// mongoose.set('useFindAndModify', false);

 router.route('/save-item-to-cart/').post(async(req, res)=>{
 const result = await cartModel.findOneAndUpdate({email:req.body.email, 'cartItems.productId':req.body.productId},{$inc:{'cartItems.$.quantity':1}},{new:true})
 
  if(result){
    res.json({status:'quantity added'})
  }
  else{
   //   res.json({status:'order added'})
   const response = await cartModel.updateOne({email:req.body.email},{$push:{cartItems:
      {
       productId:req.body.productId,
       quantity:1
      }
     }})
    res.json({status:'order added', res:response}); 
  }
  console.log(result)
});

module.exports = router;