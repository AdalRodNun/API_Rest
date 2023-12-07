const { tracksModel } = require("../models")
const { handleHttpError } = require("../utils/handleHttpError")
const { matchedData } = require("express-validator")

/**
 * Obtener una lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const user = req.user

        //const data = ["hola", "mundo"]
        const data = await tracksModel.find({}) //todo
        res.send({data, user})
    } catch(err) {
            handleHttpError(res, "ERROR_GET_ITEMS")
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.findById(id)
        res.send({data})
    } catch(err) {
            handleHttpError(res, "ERROR_GET_ITEM")
    }
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //se asegura de limpiar la data para que concuerde con el modelo
        const data = await tracksModel.create(body)
        res.send({data})
    } catch(err) {
        handleHttpError(res, "ERROR_CREATE_ITEMS")
    }
}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req) //separa el objeto en dos objetos, el objeto id y el objeto body
        const data = await tracksModel.findByIdAndUpdate(
            id, body
        )
        res.send({data})
    } catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_ITEMS")
    }
}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.delete({_id: id})
        res.send({data})
    } catch(err) {
            handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }