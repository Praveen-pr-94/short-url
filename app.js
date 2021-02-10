const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path :  path.resolve(__dirname, '.env')});  

const app = express();
app.use(express.json({extended: false}));
app.use('/' , require('./routes'));

module.exports = app;