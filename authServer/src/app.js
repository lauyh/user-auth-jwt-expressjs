//------------------- Imports ----------------------------------------------------------------

const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const app = express();
require('dotenv').config({path: require('find-config')('.env')})

const PORT = process.env.PORT || 9000;

//---------------------- General --------------------------------------------------------------
app.use(cors()) // allow cross origin
app.use(express.json()); // parse json for post request
app.use(express.urlencoded({extended:true}));

morgan(':method :url :status :res[content-length] - :response-time ms')
app.use(morgan()); // logger
app.use('/api', require('../routes/user'))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})