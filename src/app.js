express = require ("express")

const router = require("./routes/prod.router")
const routerCart = require("./routes/cart.router")

const PUERTO = 8080

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }));

server.use('/api',router)
server.use('/api',routerCart)

server.listen(PUERTO, ()=>{
  console.log(`Servidor iniciado en puerto ${PUERTO}`)
})