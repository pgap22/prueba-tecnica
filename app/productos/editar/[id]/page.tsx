import FormProducto from "@/components/forms/formProductos";
import categoriaService from "@/lib/servicios/categoriaService";
import productoService from "@/lib/servicios/productoService";
import { redirect } from "next/navigation";

interface EditarProductosProps{
    params: {
        id: number
    }
}
export const dynamic = 'force-dynamic'

export default async function EditarProductos({params} : EditarProductosProps) {
    
    const producto = await productoService.obtenerProductoPorId(+params.id)

    if(!producto) return redirect("/")

    const categorias = await categoriaService.obtenerCategorias();

    return(
        <div className="bg-gray-100 p-4 rounded-md">
           <h2 className="font-bold text-2xl ">Editar Producto</h2>
           <FormProducto producto={producto} type="edit" categorias={categorias}/>
        </div>
    )
}