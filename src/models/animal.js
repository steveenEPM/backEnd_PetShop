const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true
    }
},{  timestamps: true,})

module.exports = mongoose.model('animal',Schema)