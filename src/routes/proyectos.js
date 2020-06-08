const router = require("express").Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const {
  crearProyecto,
  obtenerProyectos,
  actualizarProyecto,
  eliminarProyecto
} = require("../controllers/proyectoController");
router.post(
  "/",
  auth,
  [check("nombre", "El nombre es obligatorio").not().isEmpty()],
  crearProyecto
);
//obtener proyectos
router.get("/", auth, obtenerProyectos);

//actualizar proyectos
router.put("/:id", auth, 
[
check('nombre' , 'el nombre del proyecto es obligatorio').not().isEmpty()
],
actualizarProyecto);

//actualizar proyectos
router.delete("/:id", auth, eliminarProyecto);

module.exports = router;
