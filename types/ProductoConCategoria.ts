import { Prisma } from "@prisma/client";

export type ProductoConCategoria = Prisma.ProductoGetPayload<{
    include: {
        categoria: true
    }
}>