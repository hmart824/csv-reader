const File = require('../models/file');

module.exports.home = async(req , res)=>{
    try{
        let files = await File.find({})
        .sort('-createdAt');
        return res.render('home' , {
            title: 'home',
            files
        })
    }catch(err){
        if(err){
            console.log("error from home ", err);
        }
    }
}
