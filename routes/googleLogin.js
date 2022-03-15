require('dotenv').config({path:'.env'});
const {router} = require('../connection');
const userModel = require('../models/user.model');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLOUD_API);

router.route('/google-login').post((req,res)=>{
    const tokenId = req.body.token; 
    client.verifyIdToken({idToken:tokenId, audience:process.env.REACT_APP_GOOGLE_CLOUD_API})
    .then(response=>{
      // console.log(response.payload);
      // res.json({theResponse:response.payload.email_verified});
      const {email_verified,name, email} = response.getPayload();
      if(email_verified){
        userModel.findOne({email}).exec((err,user)=>{
          if(err){
            res.status(400).json({
              error:"something went wrong"
            });
          }
          else{
            /////IF THE USER EXISTS ---------------
            if(user){ /////Logging in user
              res.json({user:true});
            }
            //////IF THE USER DOESN'T EXIST ------------
            else{///we need to create this user
              res.json({user:false});
            }
          }
        })
      }
    });
    
});

module.exports = router;