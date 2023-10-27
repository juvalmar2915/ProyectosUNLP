import { Direccion } from "./direccion";

export class Punto_Retiro {
    public id:number;
    public borrado:boolean;
    public nombre:string;
    public direccion:Direccion;
    public constructor(id:number,borrado:boolean,nombre: string, direccion:Direccion){
        this.id = id;
        this.borrado = borrado;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}
