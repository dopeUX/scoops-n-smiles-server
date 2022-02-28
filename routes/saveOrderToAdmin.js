const {router} = require('../connection');
const orderAdminModel = require('../models/order.admin.model');
const cartModel = require('../models/cart.model');

router.route('/save-cart-items-to-admin/').post(async(req, res)=>{
    const response = await orderAdminModel.create({
        email:req.body.email,
        name:req.body.name,
        orderStatus:req.body.orderStatus,
        phone:req.body.phone,
        address:req.body.address,
        time:req.body.time,
        cartTotal:req.body.cartTotal,
        cartItems:req.body.cartItems
    }).then(
      await cartModel.findOneAndUpdate({email:req.body.email}, {cartItems:[]})
    );
    
    res.send(response);
})

module.exports = router;