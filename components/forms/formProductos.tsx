"use client"

import { Controller, useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { ProductoForm, productoSchema } from "@/schema/producto"
import { Textarea } from "../ui/textarea"
import { Categoria, Producto } from "@prisma/client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ErrorResponse } from "@/types/errorResponse"
import crearProducto from "@/actions/producto/crearProducto"
import Link from "next/link"
import editarProducto from "@/actions/producto/editarProducto"

interface FormProductoProps {
    type: 'create' | 'edit',
    categorias: Categoria[] | ErrorResponse,
    producto?: Producto
}

export default function FormProducto({ type, categorias, producto }: FormProductoProps) {
    const { register, handleSubmit, formState: { errors }, control } = useForm<ProductoForm>({
        resolver: zodResolver(productoSchema),
        defaultValues: {
            ...producto as ProductoForm
        }

    })

    const [cargando, enviarDatos] = useTransition();
    const [errorServidor, setErrorServidor] = useState(false);
    const router = useRouter();

    const obtenerDatos = (datos: ProductoForm) => {
        enviarDatos(async () => {
            if (type == 'create') {
                const resultado = await crearProducto(datos)
                if ('error' in resultado) {
                    setErrorServidor(true)
                    return
                }
        
            }
            if (type == 'edit') {
                const resultado = await editarProducto(+(producto?.id as number),datos)

                if ('error' in resultado) {
                    setErrorServidor(true)
                    return
                }
        
            }

            router.push("/")
            return
        })
    }

    if ('error' in categorias) return <p>No se han podido obtener las categorias para crear el producto</p>
    if (!categorias.length) return <div className="space-y-2">
        <p>No tienes categorias creadas para crear productos !</p>
        <Button asChild>
            <Link href={"/categoria/crear"}>
                Crear Categoria
            </Link>
        </Button>
    </div>

    return (
        <>
            <form noValidate onSubmit={handleSubmit(obtenerDatos)} className="space-y-4">

                <div>
                    <Label>Nombre <span className="text-red-500">*</span></Label>
                    <Input disabled={cargando} {...register("nombre")} placeholder="Nombre del producto" />
                    {errors.nombre && <p className="text-sm text-red-500 mt-2">* {errors.nombre.message}</p>}
                </div>

                <div>
                    <Label>Categorias <span className="text-red-500">*</span></Label>
                    <Controller
                        control={control}
                        name='categoriaId'
                        render={({ field }) => (
                            <Select defaultValue={type =="edit" ? ""+field.value : ""} onValueChange={(data) => field.onChange(+data)}>
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Seleccione una categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(categorias as Categoria[]).map(categoria => (
                                        <SelectItem key={categoria.id} value={"" + categoria.id}>{categoria.nombre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.categoriaId && <p className="text-sm text-red-500 mt-2">* {errors.categoriaId.message}</p>}
                </div>

                <div>
                    <Label>Descripcion (Opcional)</Label>
                    <Textarea disabled={cargando} {...register("descripcion")} placeholder="Descripcion del producto" />
                    {errors.descripcion && <p className="text-sm text-red-500 mt-2">* {errors.descripcion.message}</p>}
                </div>

                <div>
                    <Label>Precio <span className="text-red-500">*</span></Label>
                    <Input type="number" disabled={cargando} {...register("precio", { valueAsNumber: true })} placeholder="Precio del producto" />
                    {errors.precio && <p className="text-sm text-red-500 mt-2">* {errors.precio.message}</p>}
                </div>

                <div>
                    <Label>Stock <span className="text-red-500">*</span></Label>
                    <Input type="number" disabled={cargando} {...register("stock", { valueAsNumber: true })} placeholder="Stock del producto" />
                    {errors.stock && <p className="text-sm text-red-500 mt-2">* {errors.stock.message}</p>}
                </div>


                {
                    errorServidor && (
                        <Alert className="bg-red-100">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Ha ocurrido un error en el servidor
                            </AlertDescription>
                        </Alert>
                    )
                }
                <Button disabled={cargando}>{type == "create" ? "Crear" : "Editar"} Producto</Button>
            </form>
        </>
    )
}