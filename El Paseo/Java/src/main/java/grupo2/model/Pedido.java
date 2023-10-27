package grupo2.model;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Pedido {
	@Id @GeneratedValue
    @Column(name="PEDIDO_ID")
    private Long id;
	private boolean borrado;
	private String estado;
	private String tipoEntrega;
	private double total;
	@Temporal(TemporalType.DATE)
	private Date fecha;
	@ManyToOne 
	@JoinColumn(name="VISITANTE_ID")
	private Visitante visitante;
	@OneToOne(optional = true)
	private Direccion direccion;
	@OneToOne(optional = true)
	private Punto_Retiro puntoRetiro;
	@ManyToOne 
	@JoinColumn(name="RONDA_ID")
	private Ronda ronda;
	@ManyToMany
	@JoinTable(name = "pedido_producto",
	    joinColumns = @JoinColumn(name = "Pedido_PEDIDO_ID"),
	    inverseJoinColumns = @JoinColumn(name = "productos_PRODUCTO_ID")
	)
	private List<Producto> productos;
	
	public Pedido() {
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getTipoEntrega() {
		return tipoEntrega;
	}

	public void setTipoEntrega(String tipoEntrega) {
		this.tipoEntrega = tipoEntrega;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Visitante getVisitante() {
		return visitante;
	}

	public void setVisitante(Visitante visitante) {
		this.visitante = visitante;
	}

	public Direccion getDireccion() {
		return direccion;
	}

	public void setDireccion(Direccion direccion) {
		this.direccion = direccion;
	}

	public Punto_Retiro getPuntoRetiro() {
		return puntoRetiro;
	}

	public void setPuntoRetiro(Punto_Retiro puntoRetiro) {
		this.puntoRetiro = puntoRetiro;
	}

	public Ronda getRonda() {
		return ronda;
	}

	public void setRonda(Ronda ronda) {
		this.ronda = ronda;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}
	
	
}
