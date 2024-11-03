const express = require('express');
const app = express();

const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config({
    path : './.env'
})


app.use(express.json())

const teacerRouter = require('./routes/teacherRoutes');
const CustomError = require('./utils/errorHandalers/customeErrHander');


app.use("/api/v1/tech",teacerRouter)


app.all('*',(req,res,next) =>{
    const err = new CustomError("Cannot find this route",404)
    next(err)
})



//global erro handaler
app.use((error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    res.status(error.statusCode).json({
        status : error.statusCode,
        message : error.message
    })
});


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
