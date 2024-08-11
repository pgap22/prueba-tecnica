import prisma from "@/config/db"; // Asegúrate de ajustar la ruta
import { CategoriaForm } from "@/schema/categoria";

// Crear una nueva categoría
 const crearCategoria = async (data: CategoriaForm) => {
    return await prisma.categoria.create({
        data,
    });
};

// Obtener todas las categorías
const obtenerCategorias = async () => {
    return await prisma.categoria.findMany({
        include: {
            productos: true, // Incluir productos relacionados
        },
        orderBy: {
            id: 'asc'
        }
    });
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (id: number) => {
    return await prisma.categoria.findUnique({
        where: { id },
    });
};

// Actualizar una categoría
const actualizarCategoria = async (id: number, data: CategoriaForm) => {
    return await prisma.categoria.update({
        where: { id },
        data,
    });
};

// Eliminar una categoría
const eliminarCategoria = async (id: number) => {
    return await prisma.categoria.delete({
        where: { id },
    });
};

export default {
    crearCategoria,
    obtenerCategoriaPorId,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}
