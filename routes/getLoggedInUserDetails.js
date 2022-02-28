const userModel = require('../models/user.model');
const {router} = require('../connection');

router.route('/get-logged-in-user-details/').get(async(req, res)=>{
    await userModel.findOne({email:req.query.email}, {password:0}).then(response=>{
        res.json({user:response});
    })     
})

module.exports = router;