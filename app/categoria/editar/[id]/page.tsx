import FormCategoria from "@/components/forms/formCategoria";
import categoriaService from "@/lib/servicios/categoriaService";
import { redirect } from "next/navigation";

interface EditarCategoriaProps{
    params: {
        id: number
    }
}
export default async function EditarCategoria({params} : EditarCategoriaProps ) {
    const categoria = await categoriaService.obtenerCategoriaPorId(+params.id)

    if(!categoria) return redirect("/");

    return(
        <div className="bg-gray-100 p-4 rounded-md">
           <h2>Editar Categoria</h2>
           <FormCategoria categoria={categoria} type="edit" />
        </div>
    )
}