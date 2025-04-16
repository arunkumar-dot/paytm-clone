const JWT_SECRET  = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith("Bearer")){
        console.log(authHeader)
        return res.status(403).json({
            message : "Error"
        })
    }
    
    const token = authHeader.split(" ")[1]
    
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        console.log(decoded);
        
        req.userId = decoded.userId
        next()
    } catch(err){
        console.log("unable to decoded this jwt")
        return res.status(403).json({
            message:err
        })
    }
}
module.exports = {authMiddleware}