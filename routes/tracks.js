const express = require("express")
const { getItems, getItem, createItem } = require("../controllers/tracks")
const validatorCreateItem = require("../validators/tracks")
const customHeader = require("../middleware/customHeader")
const router = express.Router() //manejar rutas

router.get("/", getItems)

router.get("/:id", getItem)

router.post("/", validatorCreateItem, customHeader, createItem)

module.exports = router