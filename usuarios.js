'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

//Un esquema es basicamente una tabla
var Usuarios = Schema({
    id_Usuario: Number,
    nombre_Completo: String,
    rol: String,
    email: String,
    numero_Telefono: Number,
    password: String
})

//Exportamos el esquema usuarios
module.exports = mongoose.model('Usuarios', Usuarios)