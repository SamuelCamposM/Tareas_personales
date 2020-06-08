const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.crearUsuario = async (req, res) => {
  //revisar si hay errores
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ mensaje: "usuario ya eiste" });
    }

    //crea el nuevo usuario
    usuario = new Usuario(req.body);

    //esconder contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    
    //guarda el nuevo usuario
    await usuario.save();
    //crear y firmar el JWT
   const payload = {
        usuario : {
            id: usuario._id
        }
    }
    //firmar token 
    jwt.sign(payload , process.env.SECRETA ,{
        expiresIn: 3600 //hora
    },(err , token )=> {
        if (err) {
            throw err
        }
        res.json({ token  });
    })
    
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error ");
  }
};
