const express = require("express")
const router = express.Router() //manejar rutas
const uploadMiddleware = require("../utils/handleStorage")
const { createItem, getItem, deleteItem, getItems } = require("../controllers/storage")
const { validatorGetItem } = require("../validators/storage")

/**
 * Lista de items
 */
router.get("/", getItems)

/**
 * Detalle del item
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * Crear item
 */
router.post("/", uploadMiddleware.single("myfile"), createItem)

/**
 * Eliminar item
 */
router.delete("/:id", validatorGetItem, deleteItem)

module.exports = router