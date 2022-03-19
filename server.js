require('dotenv').config({path:'.env'});
const {app, router}= require('./connection');

const multer = require('multer');

//ROUTEs ---------------
const loginUser = require('./routes/loginUser');
const registerUser = require('./routes/registerUser');
const googleLogin = require('./routes/googleLogin');
const authCheck = require('./routes/authCheck');
const retrieveCategories = require('./routes/retrieveCategories');
const saveIceItem = require('./routes/saveIceItem');
const updateUserDetails = require('./routes/updateUserDetails');
const retrieveProducts = require('./routes/retrieveProducts');
const saveCategory = require('./routes/saveCategory');
const getCartItems = require('./routes/getCartItems');
const saveToCart = require('./routes/saveToCart');
const deleteFromCart = require('./routes/deleteFromCart');
const getLoggedInUserDetails = require('./routes/getLoggedInUserDetails');
const saveCartItemsToAdmin = require('./routes/saveOrderToAdmin');

 router.get('/',(req, res)=>{
    res.send('hello world');
})

  ////////////////////////////////////////////////////////////------------------------ 
   router.use('/api/',authCheck);
   router.use('/api/', loginUser);
   router.use('/api/', registerUser);
   router.use('/api/',googleLogin);
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
  
