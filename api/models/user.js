const mongoose = require('mongoose')
const {Schema} = mongoose;
const path = require('path')

const generalSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const modelName = path.basename(__filename, '.js')
const model = mongoose.model(modelName, generalSchema);

const RegUser = async (email, password) => {
    const response = await model.create(email,password)
    return response;
}
const findOneUser = async (email) => {
    const response = await model.findOne({email: email})
    return response;
}
const findUser = async (user) => {
    
}

const findById = async(userId) => {
    const response = await model.findById(userId)
}

module.exports = {
    RegUser,
    findOneUser,
    findUser
}