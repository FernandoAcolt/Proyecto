'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

//Un esquema es basicamente una tabla
var Actividades = Shema({
    id_Actividad: Number,
    tipo_Actividad: String,
    fecha_Vencimiento: String,
    hora_Inicio: String,
    hora_Termino: String,
    duracion: Number,
    descripcion: String,
    recordatorios: String,
    medio_Contacto: String,
    id_Usuarios: {type: Schema.id_Usuarios, ref: "Usuarios"},
    id_Clientes: {type: Schema.id_Clientes, ref: "Clientes"}
})

//Exportamos el esquema usuarios
module.exports = mongoose.model('Actividades', Actividades)

