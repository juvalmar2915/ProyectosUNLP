package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Direccion;
import grupo2.model.Visitante;

@Contract
public interface IDireccionDAO {
	public List<Direccion> getDirecciones();
	public List<Direccion> getDireccionesdeunVisitante(Visitante v);
	public Direccion getDireccion(Long id);
	public void agregarDireccion(Direccion direccion);
	public void actualizarDireccion(Direccion direccion);
	public void eliminarDireccion(Direccion direccion);
}
