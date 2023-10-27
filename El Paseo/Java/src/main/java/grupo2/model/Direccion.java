package grupo2.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
@Entity
public class Direccion {
	@Id @GeneratedValue
    @Column(name="DIRECCION_ID")
    private Long id;
	private boolean borrado;
	private String calle;
	private int numero;
	private int piso;
	private String descripcion;
	@ManyToOne
	@JoinColumn(name="VISITANTE_ID")
	private Visitante v;
	
	public Direccion() {
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
	public Visitante getVisitante() {
		return v;
	}

	public void setVisitante(Visitante v) {
		this.v = v;
	}

	public String getCalle() {
		return calle;
	}

	public void setCalle(String calle) {
		this.calle = calle;
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public int getPiso() {
		return piso;
	}

	public void setPiso(int piso) {
		this.piso = piso;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	
}
