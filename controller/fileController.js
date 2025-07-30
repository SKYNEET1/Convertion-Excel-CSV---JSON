const { json, response } = require('express');
const { File } = require('../config/databaseC');
const xlsx = require('xlsx');
const fs = require('fs')
const path = require('path')
exports.fileUpload = async (req, res) => {
    try {

        // file is the key that you gave in your postman request to send the excel file.
        if (req.file?.filename === null || req.file?.filename === undefined) {
            // if req.file is absent then returns undefined
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            })
        } else {
            const workbook = xlsx.readFile(`public/uploads/${req.file.filename}`)
            const sheetName = workbook.SheetNames[0];
            const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
            // fs.writeFileSync('output.json',JSON.stringify(data,null,2))

            const extname = path.extname(req.file.originalname)
            const namewithoutExt = path.basename(req.file.originalname, extname);
            const uniquefname = Date.now() + '-' + Math.round(Math.random() * 100);
            const newfilename = `${namewithoutExt}_${uniquefname}.json`;

            const outputDir = 'public/JSONoutputs/excel';
            fs.mkdirSync(outputDir, { recursive: true })
            const outputPath = path.join(outputDir, newfilename)
            fs.writeFile(outputPath, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Failed to write file',
                        error: err.message,
                    });
                }

                return res.status(200).json({
                    success: true,
                    message: 'File converted to JSON and saved successfully',
                });
            })
            // JSON.stringify(value, replacer, space) - replacer is a function that can be used to transform the value of an object before stringifying,space for preetyprinting

        }


    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }

}

// excell to json
// array of data
// each data
// then validate

// csb
// foi