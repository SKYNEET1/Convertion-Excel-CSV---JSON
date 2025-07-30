const path = require('path')
const xlsx = require('xlsx')
const fs = require('fs')

exports.jsonToExcell = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            })
        } else {
            const filePath = req.file.path;
            console.log(filePath)
            const jsonFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            // readfile from the path and parse the json string to json array of objects

            const workSheet = xlsx.utils.json_to_sheet(jsonFile);
            // convert the json data to excel and store it at worksheet
            const workbook = xlsx.utils.book_new();
            // this creates a new excel workbook,(like a new .xlsx file container) where you can have n number of sheet1
            xlsx.utils.book_append_sheet(workbook, workSheet, "Sheet1");
            // This adds the worksheet (you created from JSON) into the workbook under the name "Sheet1".


            const extname = path.extname(req.file.originalname);
            const namewithoutext = path.basename(req.file.originalname, extname);
            const uniquefname = Date.now() + '-' + Math.round(Math.random() * 10000)
            const newfilename = `${namewithoutext}_${uniquefname}.xlsx`
            const outputDir = 'public/Typeoutputs/json_excel'
            fs.mkdirSync(outputDir, { recursive: true });
            const finalfile = path.join(outputDir, newfilename)

            xlsx.writeFile(workbook, finalfile);


            return res.status(200).json({
                success: true,
                message: "JSON converted to Excel successfully",
                filePath: finalfile,
            });

        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Conversion failed from json to excel",
            error: err.message
        });
    }
}