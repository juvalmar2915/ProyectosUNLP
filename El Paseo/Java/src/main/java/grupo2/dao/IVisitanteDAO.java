package grupo2.dao;
import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Visitante;
@Contract
public interface IVisitanteDAO {
	public List<Visitante> getVisitantes();
	public Visitante getVisitante(long id);
	public Visitante getVisitante(String mail);
	public void agregarVisitante(Visitante visitante);
	public void actualizarVisitante(Visitante visitante);
	public void eliminarVisitante(Visitante visitante);
	
}
