const mongoose = require("mongoose");
require("dotenv").config({ path: "var.env" });

const conectarDB = async () => {

  mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
    .then(db => {
        console.log('conectado a la base de datos');
    }).catch(error => {
        console.log(error);

    })
};
//conectando a la base de datos
conectarDB()
module.exports = conectarDB;