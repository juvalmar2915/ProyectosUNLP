package grupo2.model;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.awt.Image;
@JsonIgnoreProperties({"productos"})
@Entity
public class Productor {
	@Id @GeneratedValue
    @Column(name="PRODUCTOR_ID")
    private Long id;
	private boolean borrado;
	private String nombre;
	private String descripcion;
	private String foto;
	@OneToMany(mappedBy="productor") 
	private List<Producto> productos;
	
	public Productor() {
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}
	
	
}
