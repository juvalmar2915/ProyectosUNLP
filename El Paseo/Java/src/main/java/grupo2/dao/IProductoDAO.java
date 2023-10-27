package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Producto;
@Contract
public interface IProductoDAO {
	public List<Producto> getProductos();
	public Producto getProducto(Long id);
	public void agregarProducto(Producto p);
	public void actualizarProducto(Producto p);
	public void eliminarProducto(Producto p);
}
