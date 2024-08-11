"use client"

import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { CategoriaForm, categoriaSchema } from "@/schema/categoria"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { Button } from "../ui/button"
import crearCategoria from "@/actions/categoria/crearCategoria"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { ErrorResponse } from "@/types/errorResponse"
import { Categoria } from "@prisma/client"
import editarCatagoria from "@/actions/categoria/editarCategoria"
import { ERROR_TYPES } from "@/helpers/errorTypes"

interface FormCategoriaProps {
    type: 'create' | 'edit'
    categoria?: Categoria
}

export default function FormCategoria({ type, categoria }: FormCategoriaProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<CategoriaForm>({
        resolver: zodResolver(categoriaSchema),
        defaultValues: {
            ...categoria
        }
    })

    const [cargando, enviarDatos] = useTransition();
    const [errorServidor, setErrorServidor] = useState(0);
    const router = useRouter();

    const obtenerDatos = (datos: CategoriaForm) => {
        enviarDatos(async () => {
            if (type == 'create') {
                const resultado = await crearCategoria(datos)

                if ('error' in resultado) {
                    setErrorServidor(resultado.error)
                    return
                }
            }
            if (type == "edit") {
                const resultado = await editarCatagoria(+(categoria?.id as number),datos)

                if ('error' in resultado) {
                    setErrorServidor(resultado.error)
                    return
                }
            }
            router.push("/")
            return
        })
    }


    return (
        <>
            <form onSubmit={handleSubmit(obtenerDatos)} className="space-y-4">

                <div>
                    <Label>Nombre <span className="text-red-500">*</span></Label>
                    <Input disabled={cargando} {...register("nombre")} placeholder="Nombre de la Categoria" />
                    {errors.nombre && <p className="text-sm text-red-500 mt-2">* {errors.nombre.message}</p>}
                </div>
                {
                    errorServidor ? (
                        <Alert className="bg-red-100">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {errorServidor === ERROR_TYPES.mismo_recurso && "Ya existe una categoria con ese nombre !"}
                                {errorServidor === ERROR_TYPES.servidor && "Ha ocurrido un error en el servidor"}
                            </AlertDescription>
                        </Alert>
                    ) : ""
                }
                <Button disabled={cargando}>{type == "create" ? 'Crear' : 'Editar'} Categoria</Button>
            </form>
        </>
    )
}