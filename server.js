const express = require('express');

// returns object with methods we can work with
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const DBURL = process.env.MONGODB_URI || 'mongodb://localhost/rankedgifs';
mongoose.connect(DBURL);

const port = process.env.PORT || 4600;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', router);
app.listen(port);
