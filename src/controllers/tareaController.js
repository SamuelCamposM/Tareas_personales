const { validationResult } = require("express-validator");
const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

//crea una tarea
exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  //extraer el proyectoy comprobar si existe
  try {
    const { proyecto } = req.body;
    const proyectoExiste = await Proyecto.findOne({ _id: proyecto });
    if (!proyectoExiste) {
      return res.status(500).json({ msg: "proyecto no encontrado " });
    }
    ///revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }
    //crear la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

//obtener tareas
exports.obtenerTareas = async (req, res) => {


  try {
    const { proyecto } = req.query;
    
    const proyectoExiste = await Proyecto.findOne({ _id: proyecto });
    if (!proyectoExiste) {
      return res.status(500).json({ msg: "proyecto no encontrado " });
    }
    ///revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }
    //obtener tareas por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto , nombre , estado } = req.body;
    console.log(estado);
    
    
    //si la tarea existe o no
    let tareaExiste = await Tarea.findOne({_id: req.params.id})

    if(!tareaExiste){
        return res.status(400).json({ msg: "existe esa tarea" });  
    }
    
    //extraer proyecto
    const proyectoExiste = await Proyecto.findOne({ _id: proyecto });

    
    ///revisar si el proyecto actual pertenece al usuario autenticado
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "no autorizado" });
    }

    //crear objeto con la nueva infrormacion 
let nuevaTarea  = {}
    if  (nombre) {
        nuevaTarea.nombre = nombre
    }
    if (estado || estado === false) {
        nuevaTarea.estado = req.body.estado
    }
    
    
    //guardar tarea 
    tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea ,{new : true} )
    res.json({tarea})
  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

//elimina una tarea 
exports.eliminarTarea = async ( req,res) => {
    try {
      
      
        const { proyecto  } = req.query;
        //si la tarea existe o no
        let tareaExiste = await Tarea.findOne({_id: req.params.id})
    
        if(!tareaExiste){
            return res.status(400).json({ msg: "existe esa tarea" });  
        }
        
        
        
        const proyectoExiste = await Proyecto.findOne({ _id: proyecto });
        
        
        
        ///revisar si el proyecto actual pertenece al usuario autenticado
        if (proyectoExiste.creador.toString() !== req.usuario.id) {
          return res.status(401).json({ msg: "no autorizado" });
        }
        
        
        
        
        await Tarea.findOneAndRemove({ _id : req.params.id})
        
        
          res.json({ msg: "tarea eliminada" });
      } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
      }
}
