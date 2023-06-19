const csv = require('csv-parser');
const fs = require("fs");
const path = require("path");
const File = require('../models/file');

module.exports.file = async(req , res)=>{
    try{
        let file = await File.findOne({file: req.params.name})
        let header = [];
        let results = [];
        let csvFilePath = path.join(__dirname , '..' , file.filePath);

        fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('headers' , (headers)=>{
            header = headers;
        })
        .on('data' , (data)=>{
            results.push(data);
        })
        .on('end' , ()=>{
            return res.render('file' , {
                title: file.originalName,
                head: header,
                data: results
            })
        })
    }catch(err){
        if(err){
            console.log("error from home ", err);
        }
    }
}