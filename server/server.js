const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.listen(3000, () => console.log('Reservation service listening on port 3000!'));
