const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv')

exports.jsonToCsv = async (req, res) => {

    try {
        if (!req.file?.filename) {
            return res.status(400).json({
                success: false,
                message: 'No JSON file uploaded',
            });
        }

        const parser = new Parser();
        // creating a new instance of Parser class.
        const json = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'))
        const csv = parser.parse(json)

        const extname = path.extname(req.file.originalname);
        const namewithoutext = path.basename(req.file.originalname, extname);
        const uniqfname = Math.round(Math.random() * 100000);
        const newfilename = `${namewithoutext}_${uniqfname}.csv`
        const outputDir = 'public/Typeoutputs/json_CSV'
        fs.mkdirSync(outputDir, { recursive: true })
        const outputPath = path.join(outputDir, newfilename)

        fs.writeFile(outputPath, csv, (err) => {
            if (err) {
                console.error("Error writing CSV file:", err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to save CSV file',
                    error: err.message
                    });
                }
            })

        res.status(200).json({
            success: true,
            message: 'JSON file successfully converted to CSV',
            csvFile: outputPath,
        });
    } catch (err) {
        console.error('Error in JSON to CSV:', err);
        res.status(500).json({
            success: false,
            message: 'Server error during JSON to CSV conversion',
            error: err.message,
        });
    }

}