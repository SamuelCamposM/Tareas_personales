const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
exports.crearProyecto = async (req, res) => {

      //revisar si hay errores
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    //creaar un nuevo proyecto
    const proyecto = new Proyecto(req.body)
    //guardar creador con JWT
proyecto.creador = req.usuario.id;

    proyecto.save();
    res.json(proyecto)

  } catch (error) {
    console.log(error);
    res.status(500).json({msg : 'hubo un error'})
  }
};

//obtiene todos los ptoyectos del usuario autenticado


exports.obtenerProyectos = async (req, res) =>{
    try {
        const proyecto = await Proyecto.find({creador: req.usuario.id})
        res.json(proyecto)
    } catch (error) {
        res.status(500).send('hubo un error')
    }
}

exports.actualizarProyecto = async (req,res) => {
         //revisar si hay errores
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
 //extraerla info del proyecto 

 const { nombre } = req.body

 const nuevoProyecto = {}

 if (nombre) {
     nuevoProyecto.nombre = nombre;
 }
try {
    //revisar el ID
    let proyecto = await Proyecto.findOne({_id :req.params.id })
    console.log(proyecto);
    
    //si el proyecto existez o no 
    if (!proyecto) {
        return res.status(404).json({msg:'proyecto no encontrado'})
    }
    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({msg :'no autorizado'})
        
    }
    //actualizar    
   proyecto= await Proyecto.findByIdAndUpdate({_id : req.params.id}, 
    { $set : nuevoProyecto } , {new : true});

    
    res.json({proyecto})
} catch (error) {
    console.log(error);
    res.status(500).send('error en el servidor ')
    
}

}

//eliminar proyeco 
exports.eliminarProyecto = async(req, res) => {
      
    try {
            //revisar el ID
    let proyecto = await Proyecto.findOne({_id :req.params.id })
    
    
    //si el proyecto existez o no 
    if (!proyecto) {
        return res.status(404).json({msg:'proyecto no encontrado'})
    }
    //verificar el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id ) {
        return res.status(401).json({msg :'no autorizado'})
        
    }
    //elimar proyecto
    await Proyecto.findOneAndDelete({_id : req.params.id})
    res.json({msg: 'proyecto elimiando'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg :'Error en el servidor'})
        
    }
}