const express = require('express');

const app = express();
 
app.use(express.static('../client/build'));

const server = app.listen(4000);