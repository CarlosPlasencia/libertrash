'use strict'

//REQUERIMIENTOS

var express = require('express');
var router = express.Router();

var Report = require('../models/report');
var User = require('../models/user'); 

// Operacion Read a toda la coleccion
router.route('/reports/')
	.get(function(req,res){
		console.log("reports")
		Report.find()
		.then( function(reportes) {
			res.json(reportes);
		})
	});

// Operacion Read a un registro en particular
router.route('/reports/:id')
	.get(function(req,res){
		Report.findOne({idReporte: req.params.id})
		.then( function(report) {
			res.json(report);  
		})
	});

// CREATE

// Operacion Create en la coleccion
router.route('/reports')
	.post(function(req,res){
		var reporte = new Report({ 
			calificacion: req.body.calificacion,
  		descripcion: req.body.descripcion,
  		direccion: req.body.direccion,
  		idReporte: req.body.idReporte,
  		imagen: req.body.imagen,
  		latitud: req.body.latitud,
  		longitud: req.body.longitud,
  		referencia: req.body.referencia,
  		usuario: req.body.usuario, 
		})
		reporte.save(function(err) {
			if (err) {
				console.log(err);
				res.json({success:false,error:err});
			} else {
				/*const payload = {
		      notification: {
		        title: 'Tu reporte vencera mañana',
		        body: 'Revisa nuevamente la zona para que puedas aplazarlo o dar conformidad.',
		        icon: 'ic_launcher'
		      }
		    };
		    const usuario.findOne({username: reporte.usuario})
		    .then(function(err) {
		    	if(err){
		    		console.log(err);
						res.json({success:false,error:err});
		    	} else {
				    setTimeout(function() {
							return admin.messaging().sendToDevice(usuario.FCMToken, payload).then(response => {
								console.log( response )
								setTimeout(function(){
									request
									.put(url)
			   					.send({ estado: false })
			   					 .end(function(err, res){
			   					 		console.log( res )
			   					 })
								}, 2*60*1000 )
							})
				    }, 5*60*1000 )*/
						res.json({success:true,reporte:reporte});
		    	//}
		    //})
			}
		})
	});

// UPDATE

// Operacion Update de un registro en particular
router.route('/reports/:id')
	.put(function(req,res){
		var new_estado = req.body.estado;
		Report.findOne({idReporte:req.params.id})
		.then( function(reporte) {
			if(new_estado) {
				reporte.estado = new_estado;
			} 
			reporte.save(function(err){
				if(err) {
					console.log(err);
					res.json({success:false,error:err});
				}else{
					res.json({success:true,reporte:reporte})
				}	
			})
		})
	});

// DELETE

// Operacion Update de un registro en particular
/*router.route('/reports/:nombre')
	.delete(Access,function(req,res){
		// Obtencion de parametros de url
		var nombre = req.params.nombre;
		// Busqueda del registro por su nombre unico
		Report.findOne({nombre:nombre})
		.then( function(reporte) {
			// Eliminacion del registro
			reporte.remove(function(err){
				if(err) {
					// Si hay un error al momento de guardar el registro 
					//nos muestra succes:false y cual fue el error 
					console.log(err);
					res.json({success:false,error:err});
				}else{
					// Si el registro se completo sin errores 
					// nos devuelve succes:true
					res.json({success:true})
				}	
			})
		})
	});
*/

//EXPORTACION
module.exports = router;
