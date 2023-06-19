const express = require('express');
const port = 4000;
const app = express();
const path = require('path');
const sassMiddleWare = require('node-sass-middleware');
const db = require('./config/mongoose');

//set up saass middleware
app.use(sassMiddleWare({
    src: path.join(__dirname , './statics' , 'scss'),
    dest: path.join(__dirname , './statics' , 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

//set up statics
app.use(express.static(path.join(__dirname , 'statics')));

//set up view engine and views
app.set('view engine' , 'ejs');
app.set('views' , './views');

//set up routes
app.use('/' , require('./routes'));

app.listen(port , (error)=>{
    if(error){
        console.log(`erroror in running the server : ${error}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
})