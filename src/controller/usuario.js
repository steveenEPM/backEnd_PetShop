const bcrypt = require('bcryptjs');

const { setToken ,getToken} = require('../utils/tocken')
const Usuario = require('../models/usuario')
const Ventas = require('../models/ventas')



/**Registrar usuario */
const register = async (req, res) => {
    try {
        const { usuario, password, correo, sexo, fecha } = req.body

        const exist = await Usuario.find({ $or: [{ usuario }, { correo }] })

        if (exist)
            return res.status(500).json("usuario y/o correo existente")

        const contrasena = bcrypt.hashSync(password, 8)


        const result = await Usuario.create({
            usuario, contrasena, correo, sexo, fecha
        })

        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json("error de validacion")
    }
}


const logIn = async (req, res) => {
    try {
        const { correo, password } = req.body

        const result = await Usuario.findOne({ correo })


        if (!result)
            return res.status(500).json("usuario y/o contraseña incorrectos")

        let validat = bcrypt.compareSync(password, result.contrasena)
        if (!validat)
            return res.status(500).json("usuario y/o contraseña incorrectos")

        let tocken = setToken(result._id)

        return res.status(200).json(tocken)

    } catch (error) {
        console.log(error)
        return res.status(500).json("error de validacion")
    }
}


/**Usuario va comprar un producto */
const setComprar = async (req, res) => {
    const { _id, cantidad, producto, precio, estado, idProducto } = req.body

    try {
        const result = await Usuario.updateOne({ _id }, { $push: { compra: { producto, cantidad, precio, estado, idProducto } } })
            .then(async e => {
                let auxUser = await Usuario.findOne({ _id })

                let idCompra = auxUser.compra[auxUser.compra.length - 1]

                const auxRes = await Ventas.create({
                    idProducto,
                    idVenta: idCompra._id,
                    idUsuairo: _id,
                    producto,
                    usuario: auxUser.usuario,
                    precio,
                    cantidad
                })
                console.log(e)
                return e
            }).catch(err => "error de compra")

        if (result === "error de compra") return res.status(500).json("error de compra")

        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json("error de validacion")
    }

}


/**Vistas del usuario de todo los productos comprados */
const getCompra = async (req, res) => {


    try {
        const { _id } = req.body
        const result = await Usuario.findOne({ _id })

        return res.status(200).json({ compras: result.compra })

    } catch (error) {
        console.log(error)
        res.status(500).json("error de validacion")
    }

}


const getPerfil = async (req, res) => {

    try {
        const { key } = req.headers

        const token = getToken(key)

        const result = await Usuario.findOne({_id:token})

        
        const {usuario,correo,fecha,sexo} = result

        return res.status(200).json({usuario,correo,fecha,sexo})

    } catch (error) {
        console.log(error)
        res.status(500).json("error de validacion")
    }

}


module.exports = { register, setComprar, getCompra, logIn,getPerfil }