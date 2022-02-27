//////Products Data structure --------------------------

const { getMaxListeners } = require("./user.model");

var productsCollection = {
   
    conesType:[
      //PRoduct1
      {
        iceName:'Cone1',
        price:5,  
      },  
      //product2
      {
        iceName:'Cone2',
        price:6,  
      }
    ] 
   ,   
    cupsType:[
      {
        iceName:'Cup1',
        price:8,  
      }
    ]

};


////Cart data structure -----------------

//--cart-item collection
//  --user email 1
//      --product 1 
//      --product 2
//      --product 3
//  --user email 2
//      --product 1 
//      --product 2
//      --product 3

// {
//   id : ObjectID("eyqgfyevqfveqf"),
//   email:"shreyashfz05@gmail.com",
//   password:"secret123",
//   cart:[
//     {
//       productId:'eyfgevyufvefufvef',
//       quantity:4
//     }
//     {
//       productId:'eyfgevyufvefufvef',
//       quantity:4
//     }
//   ]
// }

 const cartCollection = {
    'shreyashfz@gmail.com': [
      {
        productID:'123',
        quantity:3,
      },
      {
        productID:'467',
        quantity:2,
      }
    ],
    'shreyashfz@gmail.com': [
      {
        productID:'123',
        quantity:3,
      },
      {
        productID:'467',
        quantity:2,
      }
    ]
 }

 /////Admin ----------

 const admin = [
   {
     email:'shreyashf21@gmail.com',
     name:'ronald weisley',
     orderStatus:'active',
     phone:9767582124,
     address:'silicon valley',
     time:05/10/2022,
     price:164.9,
     cartItems :[
       {
          productId:'abc123',
          quantity:3,
       },
       {
          productId:'abc456',
          quantity:2,
       },
     ]
   }
 ]