const bcrypt = require('bcrypt')
//----model
const userModel = require('../models/user')

//------ctrl
const tokenServices = require('./token')


const registration =  async (email, password) => {
    const subscriber = await userModel.findOneUser(email) 
    if(subscriber){ 
        return 500;
    }
    const hashPass = await bcrypt.hash(password, 5)
    const user = await userModel.RegUser({email,password: hashPass})
    const tokens = await tokenServices.saveToken({userId: user._id, email: user.email})
    return { user, tokens}
}
const login =  async (email, password) => {
    const userData = await userModel.findOneUser(email)
    if(!userData){
        return 501
    }

    const checkPassword = await bcrypt.compare(password, userData.password)
    if(!checkPassword){
        return 502
    }
    
    const tokens = await tokenServices.saveToken({userId: userData._id, email: userData.email})
    return {...tokens, payload:'авторизація успішна'}
}
const logout =  async (refreshToken) => {
    const token = tokenServices.removeToken(refreshToken)
    return token
}


module.exports = {
    registration,
    login,
    logout
}