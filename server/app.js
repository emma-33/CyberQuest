const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();

require('./auth');

const sequelize = require('./database');

const auth = require('./routes/authRoutes');
const users = require('./routes/usersRoutes');
const challenges = require('./routes/challengesRoutes');
const userChallenges = require('./routes/userChallengesRoutes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/challenges', challenges);
app.use('/api/v1/userChallenges', userChallenges);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


module.exports = app;
