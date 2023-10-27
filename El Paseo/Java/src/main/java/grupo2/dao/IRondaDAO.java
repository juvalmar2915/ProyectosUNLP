package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Ronda;

@Contract
public interface IRondaDAO {
	public List<Ronda> getRondas();
	public Ronda getRonda(Long id);
	public void agregarRonda(Ronda r);
	public void actualizarRonda(Ronda r);
	public void eliminarRonda(Ronda r);
}
