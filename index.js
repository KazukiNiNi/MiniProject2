//import
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotEnv = require('dotenv');
dotEnv.config();
const cors = require('cors');

const navRouter = require('./routes/navRoute');
const roomRouter = require('./routes/roomRoute');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//static files
app.use(express.static('public'));

//engine templates
app.set('views', './views');
app.set('view engine', 'ejs');

//routes
app.use('/', navRouter);
app.use('/room', roomRouter);

//checking connection
mongoose.connect(process.env.DB_CONNECT, ()=>{
    console.log('database connection is working')
    });

//checking server
const port = 8000;
app.listen(port,()=>{
    console.log(`The server is running in port ${port}`);
});