package grupo2.model;
import javax.persistence.*;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"email"})})
@Inheritance(strategy = InheritanceType.JOINED)
public class Persona {
	@Schema
	@Id @GeneratedValue
	private long id;
	private boolean borrado;
	private String nombre;
	@Column(name="email")
	private String email;
	private String contraseña;
	
	public Persona() {
		super();
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContraseña() {
		return contraseña;
	}
	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
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
	
}
