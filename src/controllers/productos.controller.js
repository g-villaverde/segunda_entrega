import {config} from "../constants/index.js";
import { Producto } from "../models/Productos.js";

const productos = [];

export const getProductos = (req, res) => {
    return res.status(200).json(productos);
}

export const addProducto = (req, res) => {

    /* if(!config.isAdmin)
        next({route: "hola", method: "POST"});
 */
    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;

    const newProducto = new Producto(nombre, descripcion, codigo, foto, precio, stock);
    productos.push(newProducto);
    return res.status(201).json(newProducto);

};

export const updateProducto = (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, codigo, foto, precio, stock} = req.body;

    const producto = producto.find((producto)=> producto.id == id);
    if(!producto) {
        return res.status(404).json({msg: "producto no encontrado"});
    }
    (producto.nombre = nombre),
        (producto.descripcion = descripcion),
        (producto.codigo = codigo),
        (producto.foto = foto),
        (producto.prcio = precio),
        (producto.stock = stock);

    res.status(200).json(producto)

};

export const deleteProducto = (req, res) => {

    const {id} = req.params;

    const producto = productos.find((producto)=> producto.id == id);
    if(!producto) {
        return res.status(404).json({msg: "producto no encontrado"});
    }

    const index = productos.findIndex((producto) => producto.id == id);
    producto.splice(index, 1);

    res.status(200).end();

}

