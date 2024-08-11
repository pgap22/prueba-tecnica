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
import { AlertTriangle, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import eliminarProducto from "@/actions/producto/eliminarProducto"
interface DeleteProductoProps{
    id: string | number
}
export default function DeleteProducto({id} : DeleteProductoProps) {
    const [open, setOpen] = useState(false);
    const [cargando, enviarAccion] = useTransition();
    const [errorServidor, setErrorServidor] = useState(false);
    const handleClickEliminar = ()=>{
        enviarAccion(async()=>{
            const resultado = await eliminarProducto(+id);
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
                    <DialogTitle>¿Deseas eliminar este producto?</DialogTitle>
                    <DialogDescription>
                        Esta accion no se puede revertir !
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