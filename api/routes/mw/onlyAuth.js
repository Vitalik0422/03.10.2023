const createError = require('http-errors')
const tokenServices = require('../../controllers/token')

const authMw = (req , res, next)=>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return next(createError(401)) 
    }
    const accessToken = authHeader.split(' ')[1]
    if(!accessToken){
        return next(createError(401))
    }

    const userData = tokenServices.validateAccessToken(accessToken);
    if(!userData){
        return next(createError(401))
    }
    req.user = userData
    next();
}

module.exports = authMw