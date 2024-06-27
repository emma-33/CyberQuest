const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

require('./auth/passport');
require('./models/user_model')

const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use('/api/v1', api);

module.exports = app;
