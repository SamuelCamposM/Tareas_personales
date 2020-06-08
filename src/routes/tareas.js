const router = require("express").Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} = require("../controllers/tareaController");

router.post(
  "/",
  auth,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("proyecto", "el proyecto es obligatorio").not().isEmpty(),
  ],
  crearTarea
);

//obtener tareas por proyecto
router.get("/", auth, obtenerTareas);

//actualizar tarea
router.put("/:id", auth, actualizarTarea);

//eliminar tarea
router.delete('/:id',auth , eliminarTarea)
module.exports = router;
