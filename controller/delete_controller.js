const File = require('../models/file');
const fs = require('fs');
const path = require('path');

module.exports.delete = async(req , res)=>{
    try{
        let file = await File.findByIdAndDelete(req.params.id);

        //*this will delete the file from upload folder
        fs.unlinkSync(path.join(__dirname , '..' , file.filePath));

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        id: req.params.id
                    },
                    message: 'file deleted'
                })
            }
        return res.redirect('back');
    }catch(err){
        if(err){
            console.log("error from delete ", err);
        }
    }
}