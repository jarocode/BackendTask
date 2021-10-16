const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
dotenv.config({path: './config/config.env'});
connectDB();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes/auth.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));