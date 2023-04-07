const { listItems, listAnimal,contProduct,productos,inforProducto,searchProd} = require('../controller/navegacion')

const router = require('express').Router()

router.post('/listAnimal',listAnimal)


router.post('/listItems',listItems)

router.post('/contProduct',contProduct)

router.post('/productos',productos)

router.post('/inforProducto',inforProducto)

router.post('/searchProd',searchProd)

module.exports = router