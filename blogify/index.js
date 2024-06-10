const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser')
const path=require('path');
const userroute=require('./routes/user')
const blogroute=require('./routes/blog')
const Blog=require('./models/blog')
const {CheckForAuthentication}=require('./middleware/authentication')
const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((e)=>{console.log("MongoDB connected");})

app.set("view engine",'ejs');
app.set('views',path.resolve("./views"));

app.use(cookieParser());
app.use(express.static(path.resolve('./public')))
app.use(CheckForAuthentication('token'));

app.get('/',async (req,res)=>{
    const allblogs=await Blog.find({})
    res.render('home',{
        user:req.user,
        blogs:allblogs,
    });
})

app.use("/user",userroute);
app.use("/blog",blogroute);

app.listen(8000,()=>{
    console.log("Server Started...")
})