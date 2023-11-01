const mongoose = require("mongoose")

const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI)
    .then(() => {
        console.log("Conexión correcta")
    })
    .catch((_) => {
        console.log("Error en conexión")
    })
}

module.exports = dbConnect