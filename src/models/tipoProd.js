const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    tipo:{
        type:String,
        required:true
    }
},{  timestamps: true})

module.exports = mongoose.model('tipo_producto',Schema)