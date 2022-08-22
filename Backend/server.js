// All imports
const UserModel = require('./UserModel');
const express = require('express');
const app = express();
const authRouter = require("./Routes/authRouter")

// Cros
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


// Setting up server and middlewares.

app.use(express.json());
app.listen(5000, ()=>{
    console.log("Active at port 5000");
})

app.use("/auth", authRouter)


// app.post("/signup", async(req, res)=>{
//     console.log( req.body , "data recieved");
//     let data = req.body;
//     data.id = 001; //  
//     let newUser = await UserModel.create(data);
//     console.log(newUser);
//     res.end("Data has came")
// })


// app.post("/login", async(req, res)=>{
//     try{
//         let data = req.body;
//         let user = await UserModel.findOne({email : data.email});
//         if(user){
//             console.log(user);
//             if(user.password == data.password){
//                 return res.json( user);
//             } else {
//                 return res.json({
//                     errorMessage : "Invaild User Credentials",
//                     userpass : user.password,
//                     datapass : data.password
//                 })
//             }
//         } else {
//             return res.json({
//                 errorMessage : "User not found"
//             })
//         }
//     }catch(err){
//         return res.json({
//             errorMessage : err
//         })
//     }
// })




