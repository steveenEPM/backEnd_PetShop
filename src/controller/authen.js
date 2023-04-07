const { getToken } = require('../utils/tocken')
const Usuario = require('../models/usuario')

const Authen = async (req, res , next) => {
    try {

        const { key } = req.headers


        if (!key) throw ''

        const token = getToken(key)


        const result = await Usuario.findOne({ _id: token })

        if (!result) throw ''
        console.log(token)

        return next()

    } catch (error) {
        return res.status(500).json("Aceso denegado")
    }
}

module.exports = Authen