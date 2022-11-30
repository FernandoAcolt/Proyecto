'use strict'

var express = require('express');
var UsuarioControl = require('../controlador/usuarioControl.js');

var api = express.Router();

api.post('/registro', UsuarioControl.registrarUsuario);
api.post('/login', UsuarioControl.accesoUsuario);

module.exports = api;
