const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express()
const PORT = process.env.PORT || 2000;


//Connect to DB and start Server


mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{

            app.listen(PORT,()=>{

                console.log(`Server Running on Port ${PORT}`);

            })


        })
        .catch((err) => console.log(err))