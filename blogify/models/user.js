const {Schema,model}=require('mongoose');
const {createHmac,randomBytes}=require('crypto');
const {GenerateTokens,verifyTokens}=require('../services/authentication')

const schema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    salt:{
        type:String,
    },
    profileImage:{
        type:String,
        default:"../image/avatar.png"
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:"USER"
    }
  },
  {timestamps:true}
);

schema.pre('save',function (next) {
    const user=this;

    if (!user.isModified("password")) {
        return;
    }

    const salt=randomBytes(16).toString();
    const hashedpassword=createHmac('sha256',salt)
    .update(user.password).digest('hex');
    

    this.salt=salt;
    this.password=hashedpassword;
    next();
})

schema.static('matchPassword',async function (email,password) {
    const user=await this.findOne({email});

    if (!user) {
        return false;
    }

    const salt=user.salt;
    const usergivenPassword=user.password;
    const hashedpassword=createHmac('sha256',salt)
    .update(password).digest('hex');

    if (usergivenPassword!==hashedpassword) {
        throw new Error("Incorrect Password");
    }

    const token=GenerateTokens(user);
    return token;
})

const User=new model("user",schema);

module.exports=User;