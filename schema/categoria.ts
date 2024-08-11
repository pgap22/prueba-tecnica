import z from "zod"
import { VALIDATION_ERRORS } from "./errors"

export const categoriaSchema = z.object({
    nombre: z.string({required_error: VALIDATION_ERRORS.string}).min(3, VALIDATION_ERRORS.min(3)).max(100, VALIDATION_ERRORS.max(100)),
})

export type CategoriaForm = z.infer<typeof categoriaSchema>