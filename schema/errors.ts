export const VALIDATION_ERRORS = {
    string: 'Este campo es obligatorio',
    min: (n:number)=> `Minimo de ${n} caracteres`, 
    max: (n:number)=> `Maximo de ${n} caracteres`,
    minPrice: (n:number)=> `Minimo de precio $${n}`, 
    maxPrice: (n:number)=> `Maximo de precio $${n}`,
    minStock: (n:number)=> `Minimo de stock ${n}`, 
    maxStock: (n:number)=> `Maximo de stock $${n}`,
    number: 'Este campo es obligatorio' 
}