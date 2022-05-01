const jwt = require('jsonwebtoken')
function verifyToken(req,res,next){
    let respObj = {
        isSuccess: false,
        Message: "Successful",
        Data: null,
    };
    if(!req.headers.authorization){
        respObj.isSuccess = true;
        respObj.Message = "Unauthorised Request"
        return res.status(401).send(respObj);
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token=='null'){
        respObj.isSuccess = true;
        respObj.Message = "Unauthorised Request"
        return res.status(401).send(respObj);
    }
    let payload = jwt.verify(token,process.env.SECRET_KEY )
    if(!payload){
        respObj.isSuccess = true;
        respObj.Message = "Unauthorised Request"
        return res.status(401).send(respObj);
    }
    req.userId = payload.id
    console.log(req.userId)
    next();
}
module.exports = verifyToken;