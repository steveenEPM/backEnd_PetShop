const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 120
    },
    descripcion: {
        type: String,
        required: true,
        max: 650
    },
    animal: {
        type: String,
        required: true
    }
    ,
    tipo: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        default: 1,
    },
    precio: {
        type: Number,
        required: true
    },
    url: {
        type: String
    }
}, { timestamps: true })


module.exports = mongoose.model('Producto', Schema)