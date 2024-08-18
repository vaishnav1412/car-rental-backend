const jwt = require("jsonwebtoken");
module.exports = function varifyTocken(req,res,next){
    const token = req.headers["authorization"];

    if(!token){
        return res.status(403).json({error:"No token available"});
    }jwt.verify(token,process.env.USER_ACCESS_TOKEN_SECRET,(err,decode)=>{
        if(err){
            return res.status(401).json({error:"unauthorized"})
        }
        req.username = decode.username;
        next();
    });
}