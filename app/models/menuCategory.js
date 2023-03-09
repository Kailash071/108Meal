const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const menuCategorySchema = new Schema({
    name:{type:String,default:''},
    isDeleted:{Boolean,default:false}
})
const menuCategory = mongoose.model('menuCategory',menuCategorySchema)
module.exports = menuCategory