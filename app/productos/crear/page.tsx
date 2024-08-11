import FormProducto from "@/components/forms/formProductos";
import categoriaService from "@/lib/servicios/categoriaService";
export const dynamic = 'force-dynamic'
export default async function CrearProducto() {
    const categorias = await categoriaService.obtenerCategorias();
    return(
        <div className="bg-gray-100 p-4 rounded-md">
           <h2>Crear Producto</h2>
           <FormProducto type="create" categorias={categorias}/>
        </div>
    )
}