const mongoose = require ('mongoose')
const urlSchema = new mongoose.Schema({
    // Schema for short ID of the URL
    shortId: {type : String, required : true, unique : true} ,
    redirectURL :{type : String, required : true} ,
    visitHistory : [{timestamp : { type : Number}}] ,//arr of objs to store visit timestamps
},
{timestamps: true})
const URL = mongoose.model('url',urlSchema)
module.exports = URL