import { Categoria } from "./categoria";
import { Productor } from "./productor";

export class Producto {
    public id:number;
    public borrado:boolean;
    public precio:number;
    public foto:string;
    public descripcion:string;
    public nombre:string;
    public stock:number;
	public productor:Productor;
	public categoria:Categoria;
    public constructor(id:number,borrado:boolean,precio: number, foto:string, descipcion:string, nombre:string, stock:number,productor:Productor, categoria:Categoria){
        this.id = id;
        this.borrado = borrado;
        this.precio = precio;
        this.foto = foto;
        this.descripcion = descipcion;
        this.nombre = nombre;
        this.stock = stock;
        this.productor = productor;
        this.categoria = categoria;
    }
}
