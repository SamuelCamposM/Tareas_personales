const {model , Schema} = require('mongoose')   

const Proyecto = new Schema({
    nombre:{
        type: String,
        required: true,
        trim : true

    },
    creador : {
       type : Schema.Types.ObjectId,
       ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    },

})

module.exports = model('Proyecto', Proyecto)