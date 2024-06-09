const express=require('express');
const mongoose=require('mongoose')
const app=express();
const userroute=require('./routes/user')
const dataroute=require('./routes/data')
const bodyParser=require('body-parser');
const cors=require('cors');
const { verifyToken } = require('./middleware/tokens');
const cookieParser=require('cookie-parser')
mongoose.connect("mongodb://127.0.0.1:27017/vault")

app.use(cors()); 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/home',dataroute);
app.use('/user',userroute); 
app.listen('8000',()=>{
    console.log('Server Started');
})