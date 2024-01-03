require("dotenv").config() // para usar las variables de entorno
const swaggerUi = require("swagger-ui-express")
const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/mongo")
const openApiConfiguration = require("./docs/swagger")
const app = express()

app.use(cors())
app.use(express.json()) //necesario para que express pueda procesar los json en los request
app.use(express.static("storage")) //los recursos publicos quiero que los saques de la carpeta llamda storage

const port = process.env.PORT || 3000

/**
 * Definir ruta de documentación
 */
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openApiConfiguration))

/**
 * Aqui invocamos a las rutas
 */
//localhost/api/____
app.use("/api", require("./routes"))


app.listen(port, () => {
    console.log(`Tu app esta lista por htpp://localhost:${port}`)
})

dbConnect()