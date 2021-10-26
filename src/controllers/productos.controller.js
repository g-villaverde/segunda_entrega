import {config} from "../constants/index.js";
import {Producto} from "../models/Productos.js";
import fs, { writeFile } from 'fs';

const productos = [];

let data = fs.readFileSync('./src/productos.json');
let readData = JSON.parse(data);

export const getProductos = (req, res) => {
    return res.status(200).json(readData);
}

export const addProducto = (req, res) => {

    
    const {id, timestamp, nombre, descripcion, codigo, foto, precio, stock} = req.body;

    const newProducto = new Producto(id, timestamp, nombre, descripcion, codigo, foto, precio, stock);
    productos.push(newProducto);
    console.log(newProducto);
    let dataToFile = JSON.stringify(newProducto, null, 2);
    fs.writeFile('./src/productos.json', dataToFile, ()=> {console.log("Produto guardado");})
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

    
    let dataToFile = JSON.stringify(producto)
    fs.writeFile('./src/productos.json', dataToFile, ()=>console.log("producto actualizado"));  
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

