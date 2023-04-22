const express = require('express');

const routerCart = express.Router();

const CartManager = require("../CartManager")

const manager = new CartManager("./carrito.json")

routerCart.post('/cart', async (req, res) => {
  try {
    const nuevoCart = await manager.addCart()
    res.status(200).send({estado:"ok", agregado:nuevoCart})
  } catch (error) {
    res.status(404).send({estado:error}) 
  }
});
routerCart.get('/cart/:cid', async (req, res) => {
  try {
    const id = parseInt(req.params.cid)
    const idCart = await manager.getCartById(id)
    res.status(200).send({estado:"ok", productos:idCart})
  } catch (error) {
    res.status(404).send({estado:error})   
  }
});
routerCart.post('/cart/:cid/product/:pid', async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid)
    const idProd = parseInt(req.params.pid)
    const addProd = await manager.addCartProduct(idCart,idProd)
    res.status(200).send({estado:"ok", carrito:addProd})
  } catch (error) {
    res.status(404).send({estado:error})
  }
});

module.exports = routerCart;