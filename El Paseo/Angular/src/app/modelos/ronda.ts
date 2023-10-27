export class Ronda {
    public nroRonda:number;
    public borrado:boolean;
    public fechaIni:Date;
    public fechaFin:Date;
    public fechaRetiro:Date;
    public horaIni:Date;
    public horaFin:Date;
    
    public constructor(nroRonda:number,borrado:boolean,fechaIni:Date,fechaFin:Date, fechaRetiro:Date, horaIni:Date, horaFin:Date){
        this.nroRonda = nroRonda;
        this.borrado = borrado;
        this.fechaIni = fechaIni;
        this.fechaFin = fechaFin;
        this.fechaRetiro = fechaRetiro;
        this.horaIni = horaIni;
        this.horaFin = horaFin;
    }
}