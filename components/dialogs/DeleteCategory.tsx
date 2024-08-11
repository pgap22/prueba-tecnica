"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import Link from "next/link"
import { AlertTriangle, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import categoriaService from "@/lib/servicios/categoriaService"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import eliminarCategoria from "@/actions/categoria/eliminarCategoria"
interface DeleteCategoryProps{
    id: string | number
}
export default function DeleteCategory({id} : DeleteCategoryProps) {
    const [open, setOpen] = useState(false);
    const [cargando, enviarAccion] = useTransition();
    const [errorServidor, setErrorServidor] = useState(false);
    const handleClickEliminar = ()=>{
        enviarAccion(async()=>{
            const resultado = await eliminarCategoria(+id);
            if ('error' in resultado) {
                setErrorServidor(true)
                return
            }
            setOpen(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={(e)=>{
            if(cargando) return
            setOpen(e)
        }}>
            <DialogTrigger>
                <Button variant={"destructive"} asChild className="p-0 w-10 h-10 ">
                    <div>
                        <Trash size={20} />
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => { e.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>¿Deseas eliminar esta categoria?</DialogTitle>
                    <DialogDescription>
                        Esta accion no se puede revertir y borraras los productos asociados a esta categoria !
                    </DialogDescription>
                </DialogHeader>
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
                <DialogFooter className="flex-col sm:justify-start sm:space-y-0 space-y-2">
                    <Button disabled={cargando} onClick={handleClickEliminar} variant={"destructive"}>Eliminar Categoria</Button>
                    <DialogClose className="w-full sm:w-fit">
                        <Button disabled={cargando} className="w-full" variant={"secondary"}>Cancelar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}