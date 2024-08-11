import z from "zod"
import { VALIDATION_ERRORS } from "./errors"

export const productoSchema = z.object({
    nombre: z.string({required_error: VALIDATION_ERRORS.string}).min(3, VALIDATION_ERRORS.min(3)).max(255, VALIDATION_ERRORS.max(255)),
    //Opcional
    descripcion: z.literal('').or(z.string({required_error: VALIDATION_ERRORS.string}).min(3, VALIDATION_ERRORS.min(3)).max(500, VALIDATION_ERRORS.max(500))),
    precio: z.number({required_error: VALIDATION_ERRORS.number, message: VALIDATION_ERRORS.number}).min(0.1, VALIDATION_ERRORS.minPrice(0.1)).max(100000, VALIDATION_ERRORS.maxPrice(100000)),
    stock: z.number({required_error: VALIDATION_ERRORS.number, message: VALIDATION_ERRORS.number}).min(1, VALIDATION_ERRORS.minStock(1)),
    categoriaId: z.number({required_error: VALIDATION_ERRORS.number}),
})

export type ProductoForm = z.infer<typeof productoSchema>