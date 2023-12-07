const express = require("express")
const { validatorLogin, validatorRegister } = require("../validators/auth")
const { loginController, registerController } = require("../controllers/auth")
const router = express.Router() //manejar rutas

/**
 * Crear un registro
 * localhost:3001/api/auth/register
 */
router.post("/register", validatorRegister, registerController)

router.post("/login", validatorLogin, loginController)

module.exports = router