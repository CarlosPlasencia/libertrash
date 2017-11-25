'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var reportSchema = new Schema({
  calificacion: Number,
  descripcion: String,
  direccion: String,
  estado: {type: Boolean,  default:true},
  idReporte: String,
  imagen: String,
  latitud: Number,
  longitud: Number,
  referencia: String,
  usuario: String,
  fecha: { type: Date, default: Date.now },
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('report', reportSchema)