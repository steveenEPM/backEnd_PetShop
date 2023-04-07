const connection = require('./connections/mongodb')

const Animal = require('./models/animal')

const TipoProducto = require('./models/tipoProd')

const Producto = require('./models/producto')

const { data } = require('./utils/databas')
const {genRandonString} = require('./utils/functions')

async function animal1(nombre) {
    await Animal.create({ nombre })
        .then(e => console.log(e))
        .catch(err => console.log(err))
}

async function tipoPro(tipo) {
    console.log()
    await TipoProducto.create({ tipo })
        .then(e => console.log(e))
        .catch(err => console.log(err))
}

async function productos1(nombre, descripcion, animal, tipoPr, cantidad, precio, url) {
    const restTip = await TipoProducto.findOne({ tipo: tipoPr })
    const restAnim = await Animal.findOne({ nombre: animal })

    console.log(nombre)

    if (restTip && restAnim) {
        Producto.create({
            nombre,
            descripcion,
            animal,
            tipo: tipoPr,
            cantidad,
            precio,
            url
        }).then(e => console.log(e))
            .catch(err => console.log(err))
    }else{
        console.log("no encontrado: =>",restAnim,"=>",restTip)
    }
}





data.forEach(e => {

    for (let index = 0; index < 10; index++) {
        let producto =  genRandonString(15) + e.nombre
        let descripcion =  genRandonString(15) + e.descripcion
        productos1(producto, descripcion, e.animal, e.tipo, e.cantidad, e.percio, e.imagen)

    }
})


/*
animal1('perro')
animal1('gato')
animal1('pajaro')

const array1 = ['Alimentos', 'Camas y Mantas', 'Casas', 'Cepillos', 'Collares', 'Comedores', 'Juguetes', 'Salud']

array1.forEach(element => {
    tipoPro(element.toLocaleLowerCase())
});

*/