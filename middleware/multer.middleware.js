const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null,'public/uploads');
    },
    filename:function(req,file,cb){
        const extension = path.extname(file.originalname);
        // console.log(extension);  '.xlsx'  Extract the file extension from the file
        // const filename = path.basename(file.originalname);
        // console.log(filename); 'user_data.xlsx' Extract the full file name without the directory path.
        const nameWithoutExt = path.basename(file.originalname,extension);
        const uniqueSuffix = Date.now()  + '-' + Math.round(Math.random() * 100);
        cb(null,nameWithoutExt + '-' + uniqueSuffix + extension)
    }
})

const uploadEXCEL = multer({
    storage,
    limits:{fileSize: 20 * 1024 * 1024},
    fileFilter:  function(req,file,cb){
        if(!file.originalname.match(/\.(xls|xlsx)$/)){
            return cb(new Error('Only Excel files are allowed!'), false);
            // cb(error,acceptfile)
            // creates a new err object and reject the file
        }
        cb(null,true);
    }
})
const uploadJSON = multer({
    storage,
    // limits:{fileSize: 20 * 1024 * 1024},
    fileFilter:  function(req,file,cb){
        if(!file.originalname.match(/\.(json)$/)){
            return cb(new Error('Only JSON files are allowed!'), false);
        }
        cb(null,true);
    }
})

module.exports = {uploadEXCEL,uploadJSON}