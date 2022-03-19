require('dotenv').config({path:'.env'});
const {router} = require('../connection');
const iceItemModel = require('../models/iceitem.model')
const multer = require('multer');
const path = require('path');

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
     // console.log('ice item saved', iceNameCustom);
      res.json({resp:'ice item saved', status:true, name:req.body.iceName});
    })
    }catch(err){
      console.log(err)
      res.json({status:false});
    }
  });

const storage = multer.diskStorage({
   destination:(req,file,callback)=>{
      callback(null,'uploads')
   },
   filename:(req, file,callback)=>{
     console.log(file);
     callback(null, iceNameCustom+path.extname(file.originalname));
   }
});
const upload = multer({storage:storage}).single('image');

router.route('/upload/').put(async(req,res)=>{

 await upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json({file:req.file, status:'image uploaded'});
    // console.log(iceName)
  });
  // res.send('image uploaded');
});

module.exports = router;