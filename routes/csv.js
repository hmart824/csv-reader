const express = require('express');
const router = express.Router();
const uploadController = require('../controller/upload_controller');
const deleteController = require('../controller/delete_controller');
const fileController = require('../controller/file_controller');

router.post('/upload' , uploadController.upload);
router.get('/delete/:id' , deleteController.delete);
router.get('/file/:name' , fileController.file);

module.exports = router;