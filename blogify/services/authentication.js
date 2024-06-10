const jwt=require('jsonwebtoken');
const user=require('../models/user')
const secret="$@!$@^%#"

function GenerateTokens(user) {
    const payload={
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    };
    return jwt.sign(payload,secret);
}

function verifyTokens(token) {
    return jwt.verify(token,secret);
}

module.exports={
    GenerateTokens,
    verifyTokens
}
