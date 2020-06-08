//rutgas para usuarios
const express = require('express')
const router = express.Router();
const {crearUsuario}  = require('../controllers/usuarioCOntroller')
const { check } = require('express-validator')
//crear un usuario

router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agregar un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min : 6}),
],
 crearUsuario)
module.exports = router;