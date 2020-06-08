//rutgas para autenticar usuarios
const express = require('express')
const auth = require("../middlewares/auth");
const router = express.Router();
const { autenticarUsuario , usuarioAutenticado} = require('../controllers/authController')
const { check } = require('express-validator')
//crear un usuario

router.post('/',
[
 
    check('email', 'Agregar un email valido').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min : 6}),
],
autenticarUsuario)

router.get('/',
auth, 
usuarioAutenticado
)
module.exports = router ;