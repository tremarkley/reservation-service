const express = require('express');
const router = require('./router');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use('/', router);

module.exports = app;
