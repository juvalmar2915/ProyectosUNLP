package grupo2.model;
import java.util.*;
import javax.persistence.*;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"pedidos","direcciones"})
@Entity
@PrimaryKeyJoinColumn(name="VISITANTE_ID", referencedColumnName="ID")
public class Visitante extends Persona {
	private String Telefono;
	@OneToMany
	private List<Direccion> direcciones;
	@OneToMany(mappedBy="visitante")
	private List<Pedido> pedidos;
	
	public Visitante() {
		super();
	}

	public String getTelefono() {
		return Telefono;
	}

	public void setTelefono(String telefono) {
		Telefono = telefono;
	}
	
	public List<Direccion> getDirecciones() {
		return direcciones;
	}

	public void setDirecciones(List<Direccion> direcciones) {
		this.direcciones = direcciones;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}
	
	
	
}
