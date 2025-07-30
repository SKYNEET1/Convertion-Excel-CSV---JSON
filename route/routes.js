const express = require('express');
const router = express.Router();
const {uploadEXCEL,uploadJSON} = require('../middleware/multer.middleware')
const {uploadCSV,jsonToCSV} = require('../middleware/CSV.middleware')

// type to json
const {fileUpload} = require('../controller/fileController');
const {csvtoJSON} = require('../controller/csvToJsonController')

// json to type
const {jsonToCsv} = require('../controller/jsonTocsv');
const { jsonToExcell } = require('../controller/jsonToExcell');


router.post('/fileupload',uploadEXCEL.single('excel'),fileUpload)
router.post('/csvtojson',uploadCSV.single('CSV'),csvtoJSON)

router.post('/jsontocsv',jsonToCSV.single('json'),jsonToCsv)
router.post('/jsontoexcell',uploadJSON.single('json'),jsonToExcell)


module.exports = router