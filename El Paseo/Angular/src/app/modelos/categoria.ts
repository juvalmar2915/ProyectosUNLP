export class Categoria {
    public id:number;
    public borrado:boolean;
    public nombre:string;
    public constructor(id:number,borrado:boolean,nombre: string){
        this.id = id;
        this.borrado = borrado;
        this.nombre = nombre;
    }
}