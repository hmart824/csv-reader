const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');
console.log('router has started');

router.get('/' , homeController.home);
router.use('/csv' , require('./csv'));

module.exports = router;

