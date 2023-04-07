const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://steveen123:elementocarmesi@cluster0.eud8h.mongodb.net/petShop")
    .then(() => {
        console.log('Conexion exitosa')
    }).catch(err => {
        console.log(err);
        console.log('Error de conecion')
    })


module.exports = mongoose