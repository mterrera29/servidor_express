const fs = require("fs")

class ProductManager{
  static ultimo_id = 0
  constructor(ruta){
    this.ruta = ruta
    this.products = []
  }
  
  getProducts = async() => {
    const products = await fs.promises.readFile(this.ruta, "utf-8")
    return JSON.parse(products)
  }

  addProduct = async(obj)=>{
    const keys = Object.keys(obj)
    const obligatorios = ['title', 'description','code','price','status', 'stock','category']
    const sameCode = this.products.find((prod)=>prod.code === obj.code)
    
    if (obligatorios.every(val => keys.includes(val))) {
      if(!sameCode){
        ProductManager.ultimo_id = ProductManager.ultimo_id +1
        const producto_id = {
          id: ProductManager.ultimo_id
        }
        const producto_obj = obj
        const producto_nuevo = {...producto_id,...producto_obj}
        this.products.push(producto_nuevo)
        const cadenaArchivo = JSON.stringify(this.products)
        await fs.promises.writeFile(this.ruta, cadenaArchivo)
        console.log("Archivo actualizado")
        return producto_nuevo
      }else{
        return "Los productos no pueden incluir el mismo code"
      }
    }else{
      return "Es obligatorio incluir todos los campos"
    }
  }

  getProductById = async(id)=>{
    const products = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
    const filterId = products.filter((prod)=> (prod.id == id)) 
    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      return filterId
    }
  }

  updateProduct = async(id, campo)=>{
    const products = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
    const filterId = products.filter((prod)=> (prod.id == id))
    const key = Object.keys(campo)
    const value = Object.values(campo) 

    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      const filterOtherId = products.filter((prod)=> (prod.id !== id))
      filterId.map((elemento)=> (elemento[key]= value[0]))
  
      const cadenaProductos = [...filterOtherId, ...filterId]
      this.products = cadenaProductos
      const cadenaArchivo = JSON.stringify(cadenaProductos)
      await fs.promises.writeFile(this.ruta, cadenaArchivo)
      console.log("Producto editado") 
      return filterId
    }
  }

  deleteProduct= async(id)=>{
    const products = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"))
    const filterId = products.filter((prod)=> (prod.id == id)) 
    if (filterId.length === 0){
      return "Error, no hay ningun producto con esa Id"
    }else{
      const filterIdDelete = products.filter((prod)=> (prod.id !== id))
      const cadenaArchivo = JSON.stringify(filterIdDelete)
      this.products= filterIdDelete
      await fs.promises.writeFile(this.ruta, cadenaArchivo)
      console.log("Producto eliminado") 
      return filterId
    }
  }
}

module.exports = ProductManager
