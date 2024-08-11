import CategoriaTabla from "@/components/tables/CategoriaTabla";
import ProductoTabla from "@/components/tables/ProductoTable";
import { Button } from "@/components/ui/button";
import categoriaService from "@/lib/servicios/categoriaService";
import productoService from "@/lib/servicios/productoService";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const categorias = await categoriaService.obtenerCategorias();
  const productos = await productoService.obtenerProductos();
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between">
        <h2 className="font-bold text-2xl">Categorias</h2>
        <Button asChild>
          <Link href={"/categoria/crear"}>
            Crear Categoria
          </Link>
        </Button>
      </div>
      <CategoriaTabla categorias={categorias} />
      <div className="flex flex-col sm:flex-row justify-between">
        <h2 className="font-bold text-2xl">Productos</h2>
        <Button asChild>
          <Link href={"/productos/crear"}>
            Crear Producto
          </Link>
        </Button>
      </div>
      <ProductoTabla productos={productos} />
    </>
  );
}
