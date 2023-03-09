const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name:{type:String,default:''},
    email:{type:String,required:true},
    password:{type:String,required:true},
    jwt_token:{type:String},
    isDeleted:{Boolean,default:false}
})
const admin = mongoose.model('admin',adminSchema)
module.exports = admin