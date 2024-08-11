"use server"

import prisma from "@/config/db";
import categoriaService from "@/lib/servicios/categoriaService";
import { CategoriaForm } from "@/schema/categoria";
import { ErrorResponse } from "@/types/errorResponse";
import { Categoria } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function editarCatagoria(id:number,data:CategoriaForm) : Promise<Categoria | ErrorResponse> {
    try {

        const categoria = await categoriaService.actualizarCategoria(id,data);
        revalidatePath("/")

        return categoria

    } catch (error) {
        console.log(error)
        return {error: 1}
    }
}