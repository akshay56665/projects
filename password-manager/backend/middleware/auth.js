const { verifyToken } = require("./tokens");

async function Verify(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.send("login");
    }
    try {
        const data = verifyToken(token);
        req.name=data.name;
        req.userId = data.userid;
        req.email = data.email;
        return next();
    } catch {
        return res.status(403).send("unknown error");
    }
}

module.exports={Verify}