const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());
const routes = require('./route/routes');
app.use('/api/v1',routes);

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})

const dbConnect = require('./config/databaseC')
dbConnect();