const jsonwebtoken = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Firmar el web token
 * @param {object} user user object
 */
const tokenSign = async (user) => {
    const sign = jsonwebtoken.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )

    return sign
}

/**
 * Verifica el token de la sesión de usuario
 * @param {*} tokenJwt token de usuario
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jsonwebtoken.verify(tokenJwt, JWT_SECRET)
    } catch(e) {
        return null
    }
}

module.exports = { tokenSign, verifyToken }