const mongoose = require("mongoose")
const messageModel = mongoose.Schema({
 
    
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat:{type: mongoose.Schema.Types.ObjectId,ref:"Chat"}


}, { timestand: true })
const Message = mongoose.Model("Message", messageModel)
module.exports=Message