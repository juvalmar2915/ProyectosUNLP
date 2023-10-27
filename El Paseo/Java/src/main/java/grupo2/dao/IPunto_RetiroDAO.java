package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Punto_Retiro;

@Contract
public interface IPunto_RetiroDAO {
	public List<Punto_Retiro> getPuntosdeRetiro();
	public Punto_Retiro getPuntoRetiro(Long id);
	public void agregarPuntoRetiro(Punto_Retiro p);
	public void actualizarPuntoRetiro(Punto_Retiro p);
	public void eliminarPuntoRetiro(Punto_Retiro p);
}
