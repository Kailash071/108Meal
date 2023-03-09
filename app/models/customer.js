const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name:{type:String,default:''},
    email:{type:String},
    subject:{type:String,default:''},
    message:{type:String,default:''},
    isDeleted:{Boolean,default:false}
})
const customer = mongoose.model('customer',customerSchema)
module.exports = customer