'use strict'

var bcrypt = require('bcrypt');
var usuariosModelo = require('../modelo/usuarios');
var usuario = new usuariosModelo();

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una accion del controlador de usuarios del api REST con node y mongo'
    });
}

function registrarUsuario(req, res) {

    var params = req.body; //recibe todos los datos por POST
    console.log(params);

    //Almacena los nombres que almacena el usuario
    usuario.id_Usuario = params.id_Usuario
    usuario.nombre_Completo = params.nombre_Completo;
    usuario.rol = params.rol;
    usuario.email = params.email;
    usuario.numero_Telefono = params.numero_Telefono;
    usuario.password = params.password;

    if (params.password) 
    {
        bcrypt.hash(params.password, 10, function(err, hash) 
        {
            usuario.password = hash;

            if (usuario.nombre_Completo != null && usuario.rol != null && usuario.email != null && usuario.numero_Telefono != null) 
            {
                //guardar el ususario en BD
                usuario.save((err, usuarioAlmacenado) => 
                {
                    if (err) 
                    {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    } 
                    else 
                    {
                        if (!usuarioAlmacenado) 
                        {
                            res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                        } else 
                        {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ usuarios: usuarioAlmacenado });
                        }
                    }
                });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });

    } else {
        res.status(500).send({ mesagge: 'Introduce la contraseña' });
    }


}

function accesoUsuario(req, res) 
{
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({ email: email}, (err, nombre_Completo) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion' });
        } 
        else 
        {
            if (!nombre_Completo) 
            {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } 
            else 
            {
                bcrypt.compare(password, usuario.password, function(err, check) 
                {
                    if (check) 
                    {
                        //devolver los datos del ususario logeado
                        console.log('coincide el password')
                        if (params.gethash) 
                        {
                            //devolver un token de jwt
                        } else 
                        {
                            res.status(200).send({ nombre_Completo: nombre_Completo });
                        }
                    } 
                    else 
                    {
                        res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                    }
                });
            }

        }
    });
}





module.exports = {
    prueba, registrarUsuario, accesoUsuario
};



