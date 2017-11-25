'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('user', userSchema)