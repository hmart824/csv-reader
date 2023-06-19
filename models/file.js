const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/files');

const fileSchema = new mongoose.Schema({
    filePath: {
        type:String,
        required: true
    },
    originalName:{
        type:String,
        required: true
    },
    file:{
        type:String,
        required: true
    }
},{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , FILE_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

//statics
fileSchema.statics.uploadedFile = multer({storage: storage}).single('file');
fileSchema.statics.filePath = FILE_PATH;

const File = mongoose.model('File' , fileSchema);
module.exports = File;

