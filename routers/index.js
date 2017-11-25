'use strict'

//REQUERIMIENTOS
var router_speciality = require('../api/report.js');
var router_user = require('../api/user.js');

//RUTEO
var routers = function(server) {
	server.use('/api/', router_speciality);
	server.use('/api/', router_user);
};

//EXPORTACION
module.exports = routers;