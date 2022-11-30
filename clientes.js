'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

//Un esquema es basicamente una tabla
var Clientes = Schema({
    id_Cliente: Number,
    nombre_Completo: String,
    email: String,
    numero_Telefono: Number,
    estado: String
})

//Exportamos el esquema usuarios
module.exports = mongoose.model('Clientes', Clientes)