"use server"

import categoriaService from "@/lib/servicios/categoriaService";
import { ErrorResponse } from "@/types/errorResponse";
import { SuccessResponse } from "@/types/SuccessResponse";
import { revalidatePath } from "next/cache";

export default async function eliminarCategoria(id: number): Promise<SuccessResponse| ErrorResponse> {
    try {

        await categoriaService.eliminarCategoria(id)
        revalidatePath("/")

        return {ok: 1}

    } catch (error) {
        console.log(error)
        return { error: 1 }
    }
}