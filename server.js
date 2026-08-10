'use strict';

require('dotenv').config();
const express = require('express');
const myDB =./connection';
const helmet = require('helmet');

const app = express();

// Parche seguro para evitar que fcctesting rompa la consola con TypeError
try {
  const fccTesting = require('./freeCodeCamp/fcctesting.js');
  fccTesting(app);
} catch (e) {
  console.log("FccTesting omitido localmente para evitar fallos.");
}

// Configuración de seguridad Helmet requerida
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
