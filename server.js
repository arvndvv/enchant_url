require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DB_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
const app = express();
app.use(express.json());
const path = require('path')
app.use(express.static(path.join(__dirname, 'view')));
{app.use(express.urlencoded({
    extended:true
}))}
require('./routes/routes')(app);

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


// app.use('/', routes)
app.listen(3000,()=>{
    console.log(`Server started at ${3000}`)
})