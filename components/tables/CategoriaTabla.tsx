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
import { Categoria } from "@prisma/client"
import DeleteCategory from "../dialogs/DeleteCategory"

interface CategoriaTablaProps {
    categorias: Categoria[] | {ok: 0} 
}

export default function CategoriaTabla({ categorias }: CategoriaTablaProps) {

    if(!categorias) return <p>No se han podido obtener las categorias</p>

    return (
        <Table>
            <TableCaption>Lista de las categorias en el sistema</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    (categorias as Categoria[]).map(categoria => (
                        <CategoriaItem key={categoria.id} categoria={categoria} />
                    ))
                }
            </TableBody>
        </Table>
    )
}


const CategoriaItem = ({categoria} : {categoria: Categoria}) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{categoria.id}</TableCell>
            <TableCell>{categoria.nombre}</TableCell>
            <TableCell className="text-right space-x-2">
                <Button asChild className="p-0 w-10 h-10 ">
                    <Link href={`/categoria/editar/${categoria.id}`}>
                        <Edit size={20} />
                    </Link>
                </Button>
                <DeleteCategory id={categoria.id} />
            </TableCell>
        </TableRow>
    )
}