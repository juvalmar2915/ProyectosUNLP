import { Visitante } from "./visitante";

export class Direccion {
    public id:number;
    public borrado:boolean;
    public calle:string;
    public numero:number;
    public piso:number;
    public descripcion:string;
    public v?: Visitante;
    public constructor(id:number,borrado:boolean, calle: string, numero:number, piso:number, descripcion:string, v?:Visitante){
        this.id = id;
        this.borrado = borrado;
        this.calle = calle;
        this.numero= numero;
        this.piso = piso;
        this.descripcion = descripcion;
        this.v = v;
    }
}