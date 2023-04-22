const express = require('express');

const router = express.Router();

const ProductManager = require("../ProductManager")

const manager = new ProductManager("./productos.json")

manager.addProduct(
{"title": "Mesa",
"description": "Mesa para el living",
"code":"mesa1",
"price":20000,
"status": true,
"stock":20,
"category": "hogar",
"thumbnail": ["https://d3ugyf2ht6aenh.cloudfront.net/stores/431/498/products/mesa-ratona-siena-41-b7726e00fa6dbe3c7616335326094050-1024-1024.jpg"]})
manager.addProduct(
{"title": "Silla",
"description": "Silla para el living",
"code":"silla1",
"price":5000,
"status": true,
"stock":50,
"category": "hogar",
"thumbnail": ["https://www.torca.com.ar/thumb/000000000005979794456verona_800x800.jpg"]})
manager.addProduct(
  {"title": "Mesa",
  "description": "Mesa para el comedor",
  "code":"mesa2",
  "price":30000,
  "status": true,
  "stock":20,
  "category": "hogar",
  "thumbnail": ["https://d3ugyf2ht6aenh.cloudfront.net/stores/243/765/products/dc87d9f9-3999-489b-8318-baea1059327f-d1caad2fd40e3f099016598937634760-480-0.jpeg"]})
  manager.addProduct(
    {"title": "Silla",
    "description": "Silla para el comedor",
    "code":"silla2",
    "price":7000,
    "status": true,
    "stock":60,
    "category": "hogar",
    "thumbnail": ["https://www.megatone.net/images//Articulos/zoom2x/339/MKT0281VIV-1.jpg"]})

router.get('/products', async (req, res) => {
  try {
    const prodArray = await manager.getProducts()
    const numberLimit = req.query.limit
    const prodLimit = prodArray.slice(0,numberLimit)
    res.status(200).send(prodLimit)   
  } catch (error) {
    res.status(404).send({estado:error}) 
  }
});

router.get("/products/:pid", async (req,res)=>{
  try {
    const id = parseInt(req.params.pid)
    const producto = await manager.getProductById(id)
    if(producto === undefined){
      res.status(200).send("El ID ingresado no existe")
    }else{
      res.status(200).send(producto)
    }
  } catch (error) {
    res.status(404).send({estado:error})
  }
}) 

router.post('/products', async (req, res) => {
  try {
    const producto = await manager.addProduct(req.body) 
    res.status(200).send({estado:"ok", producto:producto});
  } catch (error) {
    res.status(404).send({estado:error})
  }
});

router.put("/products/:pid", async (req,res)=>{
  try {
    const id = parseInt(req.params.pid)
    const producto = await manager.updateProduct(id, req.body)
    if(producto === undefined){
      res.status(200).send("El ID ingresado no existe")
    }else{
      res.status(200).send({estado:"ok", editado:producto})
    }
  } catch (error) {
    res.status(404).send({estado:error})
  }
}) 

router.delete("/products/:pid", async (req,res)=>{
  try {
    const id = parseInt(req.params.pid)
    const producto = await manager.deleteProduct(id)
    if(producto === undefined){
      res.status(200).send("El ID ingresado no existe")
    }else{
      res.status(200).send({estado:"ok", eliminado:producto})
    }
  } catch (error) {
    res.status(404).send({estado:error})
  }
}) 
module.exports = router;