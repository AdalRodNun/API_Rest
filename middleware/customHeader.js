const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key
        
        if(apiKey == "leifer-01") {
            next()
        } else {
            res.status(403)
            res.send({error: "Api key no es correcta"})
        }
        
    } catch(err) {
        res.status(403)
        res.send({error: "Algo ocurrio en el customHeader"})
    }
}

module.exports = customHeader