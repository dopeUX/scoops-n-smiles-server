const {router} = require('../connection');
const iceItemModel = require('../models/iceitem.model');
let iceNameCustom;

router.route('/save-item/').post(async(req, res)=>{
    try{
    await iceItemModel.create({
       iceName: req.body.iceName,
       category: req.body.category,
       price:req.body.price,
       color:req.body.color
    }).then(response=>{
      iceNameCustom = req.body.iceName
      console.log('ice item saved');
      res.json({status:'ice item saved', status:true});
    })
    }catch(err){
      console.log(err)
      res.json({status:false});
    }
  });

module.exports = router, iceNameCustom;  
 