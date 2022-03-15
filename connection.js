require('dotenv').config({path:'.env'});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use('/uploads/', express.static(__dirname+'/uploads'));

app.use(express.json());

const options = {
    useNewUrlParser:true,
}

const connection = mongoose.connect(process.env.MONGO_DB_HOST_COMPASS, options).then(
    app.listen(process.env.PORT| 3000, ()=>{
        console.log('server is attempting to start...')
        console.log('server started');
        
    })
);
app.use(cors());
module.exports = {app, express, router, mongoose, connection};