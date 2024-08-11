"use server"

import productoService from "@/lib/servicios/productoService";
import { ProductoForm } from "@/schema/producto";
import { ErrorResponse } from "@/types/errorResponse";
import { Producto } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function editarProducto(id: number, data: ProductoForm): Promise<Producto | ErrorResponse> {
    try {

        const producto = await productoService.actualizarProducto(id, data);
        revalidatePath("/")

        return producto

    } catch (error) {
        console.log(error)
        return { error: 1 }
    }
}