package grupo2.model;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"pedidos"})
@Entity
public class Ronda {
	@Id @GeneratedValue
    @Column(name="RONDA_ID")
    private Long nroRonda;
	private boolean borrado;
	//@Temporal(TemporalType.DATE)
	private Date fechaIni; //localdate y localtime
	//@Temporal(TemporalType.DATE)
	private Date fechaFin;
	//@Temporal(TemporalType.DATE)
	private Date fechaRetiro;
	//@Temporal(TemporalType.TIME)
	private Date horaIni;
	//@Temporal(TemporalType.TIME)
	private Date horaFin;
	@OneToMany(mappedBy="ronda")
	private List<Pedido> pedidos;
	
	public Ronda() {
		super();
	}

	public Date getFechaIni() {
		return fechaIni;
	}

	public void setFechaIni(Date fechaIni) {
		this.fechaIni = fechaIni;
	}

	public Date getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}

	public Date getFechaRetiro() {
		return fechaRetiro;
	}

	public void setFechaRetiro(Date fechaRetiro) {
		this.fechaRetiro = fechaRetiro;
	}

	public Date getHoraIni() {
		return horaIni;
	}

	public void setHoraIni(Date horaIni) {
		this.horaIni = horaIni;
	}

	public Date getHoraFin() {
		return horaFin;
	}

	public void setHoraFin(Date horaFin) {
		this.horaFin = horaFin;
	}

	public Long getNroRonda() {
		return nroRonda;
	}

	public boolean isBorrado() {
		return borrado;
	}

	public void setBorrado(boolean borrado) {
		this.borrado = borrado;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}
	
	
}
