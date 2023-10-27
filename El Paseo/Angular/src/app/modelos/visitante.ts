export class Visitante {
    public id:number;
    public borrado:boolean;
    public nombre:string;
    public email:string;
    public contrasena:string;
    public telefono:string;
    public constructor(id:number,borrado:boolean,nombre: string, email:string, contraseña:string, telefono:string){
        this.id = id;
        this.borrado = borrado;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contraseña;
        this.telefono = telefono;
    }
}
