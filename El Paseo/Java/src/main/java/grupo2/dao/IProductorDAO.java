package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Productor;

@Contract
public interface IProductorDAO {
	public List<Productor> getProductores();
	public Productor getProductor(Long id);
	public void agregarProductor(Productor p);
	public void actualizarProductor(Productor p);
	public void eliminarProductor(Productor p);
}
