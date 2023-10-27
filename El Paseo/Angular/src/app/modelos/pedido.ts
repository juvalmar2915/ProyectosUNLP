import { Direccion } from "./direccion";
import { Producto } from "./producto";
import { Punto_Retiro } from "./punto-retiro";
import { Ronda } from "./ronda";
import { Visitante } from "./visitante";

export class Pedido {
    public id:number;
    public borrado:boolean;
    public estado:string;
    public tipoEntrega:string;
    public total:number;
    public fecha: Date;
    public visitante: Visitante;
    public direccion?: Direccion;
    public puntoRetiro?: Punto_Retiro;
    public ronda: Ronda;
    public productos: Producto[];
    public constructor(id:number,borrado:boolean,estado:string, tipoEntrega:string, total:number, fecha:Date, visitante:Visitante, ronda: Ronda, productos: Producto[],direccion?:Direccion, puntoRetiro?:Punto_Retiro){
        this.id = id;
        this.borrado = borrado;
        this.estado = estado;
        this.tipoEntrega = tipoEntrega;
        this.total = total;
        this.fecha = fecha;
        this.visitante = visitante;
        this.direccion = direccion;
        this.puntoRetiro = puntoRetiro;
        this.ronda = ronda;
        this.productos = productos;
    }
}