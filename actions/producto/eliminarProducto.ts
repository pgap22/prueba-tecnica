"use server"

import productoService from "@/lib/servicios/productoService";
import { ErrorResponse } from "@/types/errorResponse";
import { SuccessResponse } from "@/types/SuccessResponse";
import { revalidatePath } from "next/cache";

export default async function eliminarProducto(id: number): Promise<SuccessResponse | ErrorResponse> {
    try {

        await productoService.eliminarProducto(id)
        revalidatePath("/")

        return {ok: 1}

    } catch (error) {
        console.log(error)
        return { error: 1 }
    }
}