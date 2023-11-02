const handleHttpError = (res, message = "Algosucedio", code = 403) => {
    res.status(code)
    res.send({error: message})
}

module.exports = {handleHttpError}
