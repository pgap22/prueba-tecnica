import FormCategoria from "@/components/forms/formCategoria";

export default function CrearCategoria() {
    return(
        <div className="bg-gray-100 p-4 rounded-md">
           <h2>Crear Categoria</h2>
           <FormCategoria type="create" />
        </div>
    )
}