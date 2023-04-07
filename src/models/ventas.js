const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    idProducto:{
        type:String,
        require:true,
        ref:'productos'
    },
    idVenta:{
        type:String,
        require:true
    },
    idUsuairo:{
        type:String,
        require:true,
        ref:'usuarios'
    },
    producto:{
        type:String,
        require:true,
    },
    usuario:{
        type:String,
        require:true
    },
    precio:{
        type:String,
        require:true
    },
    cantidad:{
        type:String,
        require:true
    }
}, { timestamps: true })

module.exports = mongoose.model('ventas',Schema)