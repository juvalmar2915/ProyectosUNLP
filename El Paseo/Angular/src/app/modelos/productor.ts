export class Productor {
    public id:number;
    public borrado:boolean;
    public nombre:string;
    public descripcion:string;
    public foto:string;
    public constructor(id:number,borrado:boolean,nombre: string, descripcion:string, foto:string){
        this.id = id;
        this.borrado = borrado;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
    }
}