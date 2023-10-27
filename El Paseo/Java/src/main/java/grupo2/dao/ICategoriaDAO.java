package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Categoria;

@Contract
public interface ICategoriaDAO {
	public List<Categoria> getCategorias();
	public Categoria getCategoria(Long id);
	public void agregarCategoria(Categoria c);
	public void actualizarCategoria(Categoria c);
	public void eliminarCategoria(Categoria Categoria);
}
