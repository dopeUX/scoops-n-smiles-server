require('dotenv').config({path:'.env'});
const {router} = require('../connection');
const userModel = require('../models/user.model');
const cartModel = require('../models/cart.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/register/').post(async (req, res)=>{
    const hashedPass = await bcrypt.hash(req.body.password, 10);
     try{
        await userModel.create({
         email : req.body.email,
         password : hashedPass
         
        }).then(response=>{
         const token = jwt.sign({
            email:req.body.email
         },process.env.JWT_SECRET_KEY); 
         
         cartModel.create({
           email:req.body.email,
           cartItems:[]
         }).then(resp=>{
           console.log({thisisuser:req.body.email})
           return res.json({status:'user created', token:token});
         });
         
        });
      }catch(err){
         return res.json({status:'error creating user'});
      }
     
   });

module.exports = router;   