const csvtojson = require('csvtojson');
const path = require('path');
const fs = require('fs')
exports.csvtoJSON = async (req, res) => {
    try {
        if (!req.file?.filename) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            })
        } else {
            const promiseObj = await csvtojson().fromFile(`public/CSVuplods/${req.file.filename}`)
            // csvtojson().fromfile() returns a promise object 

            const extname = path.extname(req.file.originalname)
            const namewithoutExt = path.basename(req.file.originalname, extname);
            const uniquefname = Date.now() + '-' + Math.round(Math.random() * 100);
            const newfilename = `${namewithoutExt}_${uniquefname}.json`;

            const outputDir = 'public/JSONoutputs/CSV';
            fs.mkdirSync(outputDir, { recursive: true }); // make sure the folder exists. 
            // Creates the entire path, including all parent folders if they don’t exist.

            const outputPath = path.join(outputDir, newfilename);

            fs.writeFile(outputPath, JSON.stringify(promiseObj, null, 2), (err) => {
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

        }
    } catch (err) {

    }

}