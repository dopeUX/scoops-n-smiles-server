require('dotenv').config({path:'.env'});
//const express = require('express');
const {app, express, router}= require('./connection');
const userModel = require('./models/user.model.js');
const iceItemModel = require('./models/iceitem.model.js');
const cartModel = require('./models/cart.model')
const productCategoryModel = require('./models/productCategory.model.js');
const path = require('path');

const multer = require('multer');

const { response } = require('express');
const bcrypt = require('bcryptjs');

//ROUTEs ---------------dwdw
const loginUser = require('./routes/loginUser');
const registerUser = require('./routes/registerUser');
const googleLogin = require('./routes/googleLogin');
const authCheck = require('./routes/authCheck');
const retrieveCategories = require('./routes/retrieveCategories');
//const myModule = require('./routes/saveIceItem');
const saveIceItem = require('./routes/saveIceItem');
const updateUserDetails = require('./routes/updateUserDetails');
const retrieveProducts = require('./routes/retrieveProducts');
const saveCategory = require('./routes/saveCategory');
const getCartItems = require('./routes/getCartItems');
const saveToCart = require('./routes/saveToCart');
const deleteFromCart = require('./routes/deleteFromCart');
const getLoggedInUserDetails = require('./routes/getLoggedInUserDetails');
const saveCartItemsToAdmin = require('./routes/saveOrderToAdmin');

// const router = express.Router();
// const app = express();
// .use(express.json());
// app.use(cors());

 router.get('/',(req, res)=>{
    res.send('hello world');
})

  ////////////////////////////////////////////////////////////------------------------ 
   router.use('/api/',authCheck);
   router.use('/api/', loginUser);
   router.use('/api/', registerUser);
   router.use('/api/',googleLogin);
  // router.use('/api/', myModule.saveIceItem);
   router.use('/api/', saveIceItem);
   router.use('/api/', retrieveCategories);
   router.use('/api/', retrieveProducts);
   router.use('/api/', saveCategory);
   router.use('/api/', updateUserDetails);
   router.use('/api/', getLoggedInUserDetails);
   router.use('/api/', saveCartItemsToAdmin);
   router.use('/api/', deleteFromCart);
   router.use('/api/', getCartItems);
   router.use('/api/', saveToCart);

   app.use(router); 
  