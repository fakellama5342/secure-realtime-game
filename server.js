'use strict';

require('dotenv').config();
const express = require('express');
const myDB = require('./connection');
const helmet = require('helmet');
const fcctesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

fcctesting(app);

// Cabeceras de seguridad requeridas para las pruebas 16 a la 19
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }));

app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/pug/index.pug');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
module.exports = function (app) {
  // Archivo neutralizado para evitar errores de ejecución
};
