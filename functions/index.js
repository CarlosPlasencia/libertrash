'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var request = require('superagent');

exports.sendNotificationVencimiento = functions.database.ref('/reporte/{reporteId}').onWrite(event => {
	try{
		const data = event.data._newData;
		const reporteId = event.params.reporteId;
		const url = `https://libertrash.firebaseio.com/usuario/${data.usuario}/.json`
		request
		.get(url, function(err, res) {
			const usuario = res.body
			//usuario.FCMToken
			const payload = {
	      notification: {
	        title: 'Tu reporte vencera mañana',
	        body: 'Revisa nuevamente la zona para que puedas aplazarlo o dar conformidad.',
	        icon: 'ic_launcher'
	      }
	    };
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
	    }, 5*60*1000 )

		});
	}catch(error){
		console.log('Error: ', error)
		return null
	}
})