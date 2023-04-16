const Producto = require('../models/producto')
const Animal = require('../models/animal')
const { Types } = require('mongoose')


/**Ultimos Productos */
const listItems = async (req, res) => {

    try {
        const result = await Producto.find().limit(10).sort({ amount: -1 })
        console.log("ind")
        return res.status(200).json(result)

    } catch (error) {
        res.status(500).json('error de validacion')
    }
}


/**Productos **/
const productos = async (req, res) => {
    try {
        const { animal, tipo } = req.body


        if (animal) {

            const result = await Producto.find({ animal }).limit(80).sort({ amount: -1 })

            return res.status(200).json(result)
        } else {
            const result = await Producto.find().limit(80).sort({ amount: -1 })
            return res.status(200).json(result)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json('error de validacion')
    }
}

/**Lista de animales */
const listAnimal = async (req, res) => {

    const { animal } = req.body

    new Promise(async (resolve, reject) => {
        const result = await Animal.findOne({ nombre: animal })
        resolve(result)
    }).then(async e => {
        const result = await Producto.find({ animal })
        return res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
        res.status(500).json('error de validacion')
    })

}


/**Conteo de Productos con animales */
const contProduct = async (req, res) => {
    try {

        const { animal, tipo } = req.body

        if (animal) {
            let result = await Producto.find({ animal, tipo }).count()
            return res.status(200).json(result)
        } else {
            let result = await Producto.find({ tipo }).count()
            return res.status(200).json(result)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json('error de validacion')
    }
}


/**Informacion de productos */
const inforProducto = async (req, res) => {
    const { id } = req.body
    try {
        const result = await Producto.findOne({ _id: id })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json('error de validacion')
    }

}


/**Search Prdocuto */
const searchProd = async (req, res) => {
    const { search } = req.body
    try {
        const result = await Producto.find().then(e => {

            const aux = []

            e.forEach(element => {
                const match1 = element.nombre.toLocaleLowerCase().match(search.toLocaleLowerCase())
                const match2 = element.descripcion.toLocaleLowerCase().match(search.toLocaleLowerCase())

                if (match1 || match2) aux.push(element)
            });

            return aux
        })

        return res.status(200).json(result)


    } catch (error) {
        console.log(error)
        return res.status(500).json('error de validacion')
    }

}


/**Lista de producto */

module.exports = { listItems, listAnimal, contProduct, productos, inforProducto, searchProd }