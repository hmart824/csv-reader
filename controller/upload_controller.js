const File = require('../models/file');

module.exports.upload = (req , res)=>{
    try{
        File.uploadedFile(req , res , async(err)=>{
            let file;
            if(req.file && (req.file.mimetype == "application/vnd.ms-excel" || req.file.mimetype == "text/csv")){
                file = new File({
                    filePath: File.filePath + '/' + req.file.filename,
                    originalName: req.file.originalname,
                    file: req.file.filename
                })
                await file.save();
                if(req.xhr){
                    return res.status(200).json({
                      data: {
                        file: file
                    },
                      message:'file created'
                    })
                }
            }
            return res.redirect('back');
        })
    }catch(err){
        if(err){
            console.log("error from home ", err);
        }
    }
}