const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const menuListSchema = new Schema({
    name:{type:String,default:''},
    type:{type:Schema.Types.ObjectId},
    description:{type:String,default:''},
    price:{Number,default:0},
    image:{type:String},
    isDeleted:{Boolean,default:false}
})
const menuList = mongoose.model('menuList',menuListSchema)
module.exports = menuList