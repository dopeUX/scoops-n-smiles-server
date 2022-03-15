require('dotenv').config({path:'.env'});
const jwt = require('jsonwebtoken');

router.route('/auth-check').get(async (req, res)=>{
    // console.log(req.body);
  const token = req.headers['x-access-token']
  try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
     res.json({email:decoded.email});
   }catch(e){
     res.json({status:'error-user-auth',err:e});
   }
  });


module.exports = router;
