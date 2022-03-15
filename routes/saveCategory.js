const {router} = require('../connection');
const productCategoryModel = require('../models/productCategory.model');

router.route('/save-category/').put(async(req, res)=>{
    const getCategory = req.body.cat
    await productCategoryModel.create({
      category:getCategory
    }).then(response=>{
        res.json({status:'category created'});
    })

});

module.exports = router;
