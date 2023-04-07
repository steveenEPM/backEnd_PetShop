const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    usuario: {
        type: String,
        require: true,
        max: 15,
        unique: true
    },
    contrasena: {
        type: String,
        require: true,
        min: 5
    },
    correo: {
        type: String,
        require: true,
        max: 25,
        unique: true
    },
    sexo: {
        type: String,
        require: true
    },
    fecha: {
        type: String,
        require: true
    },
    compra: [
        {
            idProducto: {
                type: String
            },
            producto: {
                type: String,
            },
            cantidad: {
                type: Number
            },
            estado: {
                type: Boolean,
                default: false
            }
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('usuario', Schema)