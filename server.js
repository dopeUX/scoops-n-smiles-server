require('dotenv').config({path:'.env'});
//const express = require('express');
const {app, express, router}= require('./connection');
const userModel = require('./models/user.model.js');
const iceItemModel = require('./models/iceitem.model.js');
const cartModel = require('./models/cart.model')
const productCategoryModel = require('./models/productCategory.model.js');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');

//ROUTEs ---------------
const updateUserDetails = require('./routes/updateUserDetails');
const getCartItems = require('./routes/getCartItems');
const saveToCart = require('./routes/saveToCart');
const deleteFromCart = require('./routes/deleteFromCart');
const getLoggedInUserDetails = require('./routes/getLoggedInUserDetails');
const saveCartItemsToAdmin = require('./routes/saveOrderToAdmin');

// const router = express.Router();
// const app = express();
// .use(express.json());
// app.use(cors());
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLOUD_API);
let iceNameCustom ;


const storage = multer.diskStorage({
   destination:(req,file,callback)=>{
      callback(null,'uploads')
   },
   filename:(req, file,callback)=>{
     console.log(file);
     console.log(process.env.JWT_SECRET_KEY);
     callback(null,iceNameCustom+path.extname(file.originalname));
   }
});
const upload = multer({storage:storage}).single('image');

router.route('/upload/').put(async(req,res)=>{

  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json({file:req.file, status:'image uploaded', key:process.env.JWT_SECRET_KEY});
  });
  // res.send('image uploaded');
});

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

 router.route('/save-category/').put(async(req, res)=>{
     const getCategory = req.body.cat
     await productCategoryModel.create({
       category:getCategory
     }).then(response=>{
         res.json({status:'category created'});
     })

 });




 router.get('/',(req, res)=>{
    res.send('hello world');
})


router.route('/retrieve-categories/').get(async(req, res)=>{
  const items = await productCategoryModel.find();
  res.json({items:items})
  
});
router.route('/retrieve-products/').get(async(req, res)=>{
  const category = req.headers['category'];
  // const items = await iceItemModel.find({category:category});
  const items = await iceItemModel.find();

  res.json({items:items, cat:category, status:200});
  
});
/////// AUTHENTICATION ROUTES -----------------------------------------
//Register api
router.route('/register/').post(async (req, res)=>{
    try{
       await userModel.create({
        email : req.body.email,
        password : req.body.password
        
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

//Login api
   router.route('/login/').post(async (req, res)=>{
// console.log(req.body);
       const user = await userModel.findOne({
        email : req.body.email,
        password : req.body.password
       })
       if(user){
           const token = jwt.sign({
             email:user.email
           }, process.env.JWT_SECRET_KEY);
          console.log('user exists TOKEN:'+token);
          return res.json({token:token, user:true});
       }
       else{
           return res.json({user:false});
       }
    
     });

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

    router.route('/google-login').post((req,res)=>{
        const tokenId = req.body.token; 
        client.verifyIdToken({idToken:tokenId, audience:process.env.REACT_APP_GOOGLE_CLOUD_API}).then(response=>{
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


  ////////////////////////////////////////////////////////////------------------------ 
   router.use('/api/', updateUserDetails);
   router.use('/api/', getLoggedInUserDetails);
   router.use('/api/', saveCartItemsToAdmin);
   router.use('/api/', deleteFromCart);
   router.use('/api/', getCartItems);
   router.use('/api/', saveToCart);
   app.use(router); 
  