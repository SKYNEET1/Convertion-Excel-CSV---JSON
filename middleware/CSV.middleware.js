const multer = require('multer');
const path = require('path');
const { jsonToCsv } = require('../controller/jsonTocsv');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/CSVuplods');
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname,ext)
        const uniqueName = Date.now() + '-' + Math.round(Math.random()*100);
        cb(null,name + '-' + uniqueName + ext);
    }
})

const uploadCSV = multer({
    storage,
    limits:{fileSize:30 * 1024 * 1024}
})
const jsonToCSV = multer({
    storage,
    limits:{fileSize:30 * 1024 * 1024},
    fileFilter:  function(req,file,cb){
        if(!file.originalname.match(/\.(json)$/)){
            return cb(new Error('Only json files are allowed!'), false);
        }
        cb(null,true);
    }
})

module.exports = {uploadCSV,jsonToCSV}