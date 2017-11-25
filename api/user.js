//REQUERIMIENTOS

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

//Requerimiento de modelo speciality
var Speciality = require('../models/report');
//Requerimiento de modelo user
var User = require('../models/user');
//Requerimiento de middleware access

// OPERACIONES

// READ

// Operacion Read a toda la coleccion
router.route('/users')
	.get(function(req,res){
		// Obtener toda la coleccion users
		User.find()
		.then( function(usuarios) {
			// Servir coleccion
			informacion = {}
			informacion = []  
			usuarios.forEach(function (usuario){
				var user = {
					nombres: usuario.nombres,
					email: usuario.email,
					especialidad: usuario.especialidad,
					username: usuario.username
				}
				informacion.push(user);
			})
			res.json(informacion);
		})
	});

// Operacion Read a un registro en particular
router.route('/users/:username')
	.get(function(req,res){
		// Obtencion de parametros de url
		var username = req.params.username;
		// Busqueda de resgitro particular
		User.findOne({username:username})
		.then( function(usuario) {
			// Seleccion de informacion a servir
			var user = {
				nombres: usuario.nombres,
				email: usuario.email,
				especialidad: usuario.especialidad,
				username: usuario.username
			}
			// Servir registro
			res.json(user);  
		})
	});

// CREATE

// Operacion Create en la coleccion
router.route('/users')
	.post(function(req,res){
		try{
			console.log( req.body )
			var token = req.body.token;
			var username = req.body.username;
			var password = req.body.password;

			var saltRounds = 10;
			var salt = bcrypt.genSaltSync(saltRounds);
			var hash = bcrypt.hashSync(password,salt);

			var usuario = new User({ 
				token: token,
				username: username,
				password: hash,
			})
			console.log( "1", usuario )
			usuario.save(function(err) {
				if (err) {
					console.log(err);
					res.json({success:false,error:err});
				} else {
					console.log("2", usuario )
					res.json({success:true,usuario:usuario});
				}
			})

		} catch(err){
			console.log(err)		
		}
	});

router.route('/login')
	.post(function(req,res){
		var username = req.body.username;
		var password = req.body.password;
		User.findOne({username: username})
		.then(function(usuario){
			if(usuario){
					if(bcrypt.compareSync(password,usuario.password)){
						return res.json({success:true})
					}else{
						return res.json({success:false,error:"La contraseña es incorrecta."})	
					}	
			}else{
				return res.json({success:false,error:"El usuario no existe."})
			}
		})
	});


//EXPORTACION
module.exports = router;