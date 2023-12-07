const { userModel } = require("../models")
const { handleHttpError } = require("../utils/handleHttpError")
const { verifyToken } = require("../utils/handleJwt")

const authMiddleware = async (req, res, next) => {
    try {
        if(!req.headers.authorization) {
            handleHttpError(res, "NEED_SESSION", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() //obtener solo el token y saltarse la palabra bearer
        const dataToken = await verifyToken(token)

        if(!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }

        const user = await userModel.findById(dataToken._id)
        req.user = user

        next()
    } catch(err) {
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = { authMiddleware }