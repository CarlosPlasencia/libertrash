
'use strict'
//VARIABLES
// REQUERIMIENTO DE MODULOS
var express = require('express');
var swig = require('swig');
var cors = require('cors');
// Requerimiento de mongoose
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//CONFIGURACIONES
// Creación del servidor web con express
var server = express();
// Integracion del motor de templates swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });
//Integracion de bodyParser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(cors())

// Importacion de rutas
require('./routers')(server);

// CONFIGURACIONES DB
// Integración de mongoose
mongoose.connect('mongodb://localhost/libertrash', { useMongoClient: true });
mongoose.Promise = global.Promise;

// INICIAR SERVIDOR
// Se corre el servidor en el puerto 8000
server.listen(8000, function () {
    console.log('Servidor esta escuchando en el puerto ' + 5000)
});