import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { Delete, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { Categoria, Producto } from "@prisma/client"
import { ErrorResponse } from "@/types/errorResponse"
import { ProductoConCategoria } from "@/types/ProductoConCategoria"
import DeleteProducto from "../dialogs/DeleteProducto"

interface ProductoTablaProps {
    productos: ProductoConCategoria[] | ErrorResponse
}

export default function ProductoTabla({ productos}: ProductoTablaProps) {

    if('error' in productos) return <p>No se han podido obtener los productos</p>

    return (
        <Table>
            <TableCaption>Lista de los productos del sistema</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    productos.map(producto => (
                        <ProductoItem key={producto.id} producto={producto} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

interface ProductoItem{
    producto: ProductoConCategoria

}
const ProductoItem = ({producto} : ProductoItem) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{producto.id}</TableCell>
            <TableCell>{producto.nombre}</TableCell>
            <TableCell>${producto.precio}</TableCell>
            <TableCell>{producto.stock}</TableCell>
            <TableCell>{producto.categoria.nombre}</TableCell>
            <TableCell className="text-right space-x-2">
                <Button asChild className="p-0 w-10 h-10 ">
                    <Link href={`/productos/editar/${producto.id}`}>
                        <Edit size={20} />
                    </Link>
                </Button>
               <DeleteProducto id={producto.id} />
            </TableCell>
        </TableRow>
    )
}