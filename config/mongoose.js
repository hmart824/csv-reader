const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/csv_development');
const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'error connecting to database!'));
db.once('open' , ()=> console.log('connected to database successfully !!!!!'));

module.exports = db;