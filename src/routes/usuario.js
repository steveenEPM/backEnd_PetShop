const {register,setComprar,getCompra,logIn,getPerfil} = require("../controller/usuario")
const Authen = require('../controller/authen')

const router = require('express').Router()

router.post('/register',register)

router.post('/setComprar',Authen,setComprar)

router.post('/getCompra',Authen,getCompra)

router.post('/logIn',logIn)

router.post('/getPerfil',Authen,getPerfil)

module.exports = router