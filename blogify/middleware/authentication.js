const { verifyTokens } = require("../services/authentication");

function CheckForAuthentication(cookiename) {
    return (req,res,next) => {
        const tokencookievalue=req.cookies[cookiename];
        if (!tokencookievalue) {
            return next();
        }
        else{
            try{
                const userpayload=verifyTokens(tokencookievalue);
                req.user=userpayload;
            }
            catch{}
            return next();
        }
    }
}

module.exports={
    CheckForAuthentication,
}