const {router} = require('../connection');
const cartModel = require('../models/cart.model');

router.route('/delete-from-cart/').post(async(req,res)=>{
     await cartModel.findOneAndUpdate({email:req.body.email},{$pull:{
         cartItems:{
             productId:req.body.productId
         }
     }}).then(response=>{
        res.json({res:response});
     })
});

module.exports = router;