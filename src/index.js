import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./.env'
})




connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo DB connection failed");
})




// import express from "express"
// const app =express();
// (async()=>{
//     try{
//        await mongoose.connect(`${preocess.env.MONGODB_URL}`)
//        app.on("error",(error)=>{
//         console.log("ERRR: ", error);
//         throw error
//        })

//        app.listen(preocess.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//        })
//     } catch(error){
//             console.error("ERROR: ",error)
//             throw err
//         }
// })()