const mongoose = require('mongoose');

const uploadFile = mongoose.Schema({
    originalFile:{
        type:String,
        require:true,
    },
    fileSize:{
        type:Number,
        require:true,
    },
    uploadedAt:{
        type:Date,
        default:Date.now,
    },
    hash:{
        type:String,
        require:true,
        unique:true,
    }

})

module.exports = mongoose.model('File',uploadFile);