"use server"

import prisma from "@/config/db";
import { ERROR_TYPES } from "@/helpers/errorTypes";
import categoriaService from "@/lib/servicios/categoriaService";
import { CategoriaForm } from "@/schema/categoria";
import { ErrorResponse } from "@/types/errorResponse";
import { Categoria } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function crearCategoria(data:CategoriaForm) : Promise<Categoria | ErrorResponse> {
    try {

        const mismoNombre = await prisma.categoria.findFirst({
            where: {
                nombre: {
                    equals: data.nombre,
                    mode: 'insensitive'
                }
            }
        })

        if(mismoNombre) return {error: ERROR_TYPES.mismo_recurso}

        const categoria = await categoriaService.crearCategoria(data);
        
        revalidatePath("/")

        return categoria

    } catch (error) {
        console.log(error)
        return {error: 1}
    }
}