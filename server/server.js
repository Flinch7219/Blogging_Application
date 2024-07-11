const express = require('express');
const cors = require('cors');
const connectMongoDB = require("./config/db");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth") ;
const {authenticate} = require("./middlewares/authMiddleware")
require('dotenv').config();

const app = express();
app.use(express.json())

connectMongoDB()

app.use(cors({
    origin:[
        "*",
        "https://blogapp-client-three.vercel.app"
    ],
    credentials: true
}))

app.use('/api/blog',authenticate,blogRoutes);
app.use('/api',authRoutes);
app.get("/", async(req,res)=>{
    return res.status(200).send({message:"Blog App is up and running"})
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Blog app server is listening on port ${PORT}`)
})

module.exports=app;