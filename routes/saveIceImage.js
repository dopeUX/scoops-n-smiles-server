require('dotenv').config({path:'.env'});
const {router} = require('../connection');
const multer = require('multer');
const path = require('path');
const iceNameCustom = require('../routes/saveIceItem');

const storage = multer.diskStorage({
   destination:(req,file,callback)=>{
      callback(null,'uploads')
   },
   filename:(req, file,callback)=>{
     console.log(file);
    //  console.log(process.env.JWT_SECRET_KEY);
     callback(null,iceNameCustom+path.extname(file.originalname));
   }
});
const upload = multer({storage:storage}).single('image');

router.route('/upload/').put(async(req,res)=>{

 await upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json({file:req.file, status:'image uploaded'});
  });
  // res.send('image uploaded');
});

module.exports = router;