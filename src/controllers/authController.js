const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  //extraer email y password

  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    //revisa el password
    const passCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "contraseña incorrecta" });
    }
    //si todo es correcto  //crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario._id,
      },
    };
    //firmar token
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //hora
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//obtiene el usuario autenticado 

exports.usuarioAutenticado = async (req, res )=> {
  try {
    const usuario = await Usuario.findOne({_id :req.usuario.id }).select('-password')
    res.json({usuario})
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ msg: "hubo un error" });
  }
}
