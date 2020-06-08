const { model, Schema } = require("mongoose");

const Tarea = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  proyecto: {
      type : Schema.Types.ObjectId,
      ref : 'Proyecto'
  },
});

module.exports = model("Tarea", Tarea);
