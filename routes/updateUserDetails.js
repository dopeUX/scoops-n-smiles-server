const {router} = require('../connection');
const userModel = require('../models/user.model');

router.route('/update-user-details/').get(async(req, res)=>{
   const response = await userModel.findOneAndUpdate({email:req.query.email}, {
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      phone : req.query.phone,
      address: req.query.address
   });
   res.json({res:response}); 

});

module.exports = router;