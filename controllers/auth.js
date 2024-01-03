const { matchedData } = require("express-validator")
const { userModel } = require("../models")
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJwt")
const { handleHttpError } = require("../utils/handleHttpError")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const registerController = async (req, res) => {
    try {
        req = matchedData(req)
        const passwordHash = await encrypt(req.password)
        
        //req.password = passwordHash
        const body = {...req, password: passwordHash}
        const dataUser = await userModel.create(body)
        dataUser.set("password", undefined, {strict: false}) //quitar la contraseña
    
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.status(201)
        res.send(data)
    } catch ( err ) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginController = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await userModel.findOne({email: req.email}).select("password name role email") //aplicar filtro para que si traiga el password

        if(!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }

        const hashPassword = user.password
        const check = await compare(req.password, hashPassword)

        if(!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401)
            return
        }

        user.set("password", undefined, {strict:false}) //Volver a quitar contraseña
        const data = {
            token: await tokenSign(user),
            user: user
        }

        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerController, loginController }