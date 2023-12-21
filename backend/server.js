const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const userRoute = require("./routes/UserRoute")
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 2000;



//Middlewares

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());

// Route Middleware

app.use("/api/users",userRoute)



//Routes

app.get("/",(req,res)=> {
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);

//Connect to DB and start Server
mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{

            app.listen(PORT,()=>{
                console.log("MONGO DB CONNECTED")
                console.log(`Server Running on Port ${PORT}`);

            })


        })
        .catch((err) => console.log(err))