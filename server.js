'use strict';

require('dotenv').config();
const express = require('express');
const myDB = require('../connection');
const fccTesting = require('../freeCodeCamp/fcctesting.js');
const helmet = require('helmet');

const app = express();

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));

fccTesting(app); // For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/')
  .get((req, res) => {
    
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
