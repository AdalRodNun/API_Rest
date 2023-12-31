const bcryptjs = require("bcryptjs")

/**
 * Contraseña sin encriptar
 * @param {String} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    return hash
}

/**
 * Compara contraseña sin encriptar con otra contraseña encriptada
 * @param {String} passwordPlain 
 * @param {String} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }