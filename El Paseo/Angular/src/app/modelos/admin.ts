export class Admin {
    public id:number;
    public borrado:boolean;
    public nombre:string;
    public email:string;
    public contrasena:string;
    public constructor(id:number,borrado:boolean,nombre: string, email:string, contraseña:string){
        this.id = id;
        this.borrado = borrado;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contraseña;
    }
}
