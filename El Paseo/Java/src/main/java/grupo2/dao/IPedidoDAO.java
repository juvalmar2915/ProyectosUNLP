package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Pedido;
@Contract
public interface IPedidoDAO {
	public List<Pedido> getPedidos();
	public Pedido getPedido(Long id);
	public Pedido getPedido(Long id, Long nroronda);
	public void agregarPedido(Pedido p);
	public void actualizarPedido(Pedido p);
	public void eliminarPedido(Pedido p);
}
