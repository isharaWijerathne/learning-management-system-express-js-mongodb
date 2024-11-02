const express = require('express');
const app = express();

const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config({
    path : './.env'
})


app.use(express.json())








mongoose.connect(process.env.APP_MONGO_CON_SRT)
    .then((connection) =>{
        if(process.env.APP_ENV === "development")
            {
                console.log("mongodb connected successfully");  
            }
    }).catch((error) =>{
            console.log(error.message);
            
    });


app.listen(process.env.APP_PORT,() =>{

    if(process.env.APP_ENV === "development")
        {
            console.log("server is running on port " + process.env.APP_PORT );  
        }
    
})
