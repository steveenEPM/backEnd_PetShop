var express = require('express')
var conection = require('./src/connections/mongodb')
var navegacion = require('./src/routes/navegacion')
var usuario = require('./src/routes/usuario')
var cors = require('cors')
var morgan = require('morgan')


const app = express()

const port = 3030

app.use(express.urlencoded({extended:true}))

app.use(express.json())



app.use(cors({
    origin:"*",
    methods:"GET,PUT,POST,DELETE",
    preflightContinue:false,
    optionsSuccessStatus:200
}))


 

app.use(morgan(":remote-addr - :remote-user [ :date[clf]]  :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent  - :response-time ms"))



app.use('/navegacion',navegacion)

app.use('/usuario',usuario)


app.listen(port, () => console.log(`App escuchando en el  Puerto ${port}!`))

