const { handleHttpError } = require("../utils/handleHttpError")

/**
 * Array con los roles permitios
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const user = req.user
        console.log({user})
        const rolesByUser = user.role
        
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))

        if(!checkValueRol) {
            handleHttpError(res, "USER_NOT_PERMISSION", 403)
            return
        }

        next()
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = checkRol