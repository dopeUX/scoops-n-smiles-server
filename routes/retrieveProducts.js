const {router} = require('../connection');
const iceItemModel = require('../models/iceitem.model');

router.route('/retrieve-products/').get(async(req, res)=>{

    let category = "";
    const items = await iceItemModel.find();
    res.json({items:items, cat:category, status:200});
    
  });

module.exports = router;  