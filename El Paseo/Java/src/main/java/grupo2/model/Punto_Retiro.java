package grupo2.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Punto_Retiro {
	@Id @GeneratedValue
    @Column(name="PUNTORETIRO_ID")
    private Long id;
	private boolean borrado;
	private String nombre;
	@OneToOne 
	private Direccion direccion;
	
	public Punto_Retiro() {
		super();
	}

	public Long getId() {
		return id;
	}
	
	public boolean isBorrado() {
		return borrado;
	}

	public void setBorrado(boolean borrado) {
		this.borrado = borrado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Direccion getDireccion() {
		return direccion;
	}

	public void setDireccion(Direccion direccion) {
		this.direccion = direccion;
	}
	
	
}
