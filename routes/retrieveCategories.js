const {router} = require('../connection');
const productCategoryModel = require('../models/productCategory.model');

router.route('/retrieve-categories/').get(async(req, res)=>{
    const items = await productCategoryModel.find();
    res.json({items:items})
    
});

module.exports = router;