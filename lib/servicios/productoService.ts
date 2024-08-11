
import prisma from "@/config/db"; // Asegúrate de ajustar la ruta
import { ProductoForm } from "@/schema/producto"; // Asegúrate de que esta sea la ruta correcta

// Crear un nuevo producto
const crearProducto = async (data: ProductoForm) => {
    return await prisma.producto.create({
        data,
    });
};

// Obtener todos los productos
const obtenerProductos = async () => {
    return await prisma.producto.findMany({
        include: {
            categoria: true, // Incluir categoría relacionada
        },
    });
};

// Obtener un producto por ID
const obtenerProductoPorId = async (id: number) => {
    return await prisma.producto.findUnique({
        where: { id },
        include: {
            categoria: true, // Incluir categoría relacionada
        },
    });
};

// Actualizar un producto
const actualizarProducto = async (id: number, data: ProductoForm) => {
    return await prisma.producto.update({
        where: { id },
        data,
    });
};

// Eliminar un producto
const eliminarProducto = async (id: number) => {
    return await prisma.producto.delete({
        where: { id },
    });
};

export default {
    crearProducto,
    obtenerProductoPorId,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto,
};