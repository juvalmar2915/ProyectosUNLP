package grupo2.resources;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import grupo2.dao.FactoriaDAO;
import grupo2.dao.IPedidoDAO;
import grupo2.dao.IProductoDAO;
import grupo2.dao.PedidoDAO;
import grupo2.dao.ProductoDAO;
import grupo2.model.Direccion;
import grupo2.model.Pedido;
import grupo2.model.Producto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Request;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriInfo;

@Path("pedidos")
@Tags(value= {@Tag(name="Pedidos",description="Metodos de Pedidos")})
public class PedidoResource {

	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	@Inject
	private PedidoDAO pdao; //= FactoriaDAO.getPedidoDAO();
	@Inject
	private ProductoDAO proddao; //= FactoriaDAO.getProductoDAO();
	
	@GET
	@Path("/todos")
	@Operation(summary = "Obtener pedidos", description = "se listan todos los pedidos de la base de datos")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Pedido> getAll() {
		return pdao.getPedidos();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener pedido por id", description = "se recupera el pedido de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicho Pedido y es listado"),
			@ApiResponse(responseCode= "404", description = "Pedido no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Pedido p= pdao.getPedido(id);
		if (p != null){
			return Response
					.ok()
					.entity(p)
					.build();
		} else {
			mensaje="No se encontró el pedido";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@GET
	@Path("/cliente/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener pedidos por id de usuario", description = "se recupera los pedidos de un usuario")
	public Response encontrar2(@PathParam("id") Long id){
		List<Pedido> l= pdao.getPedidosbyusuario(id);
			return Response
					.ok()
					.entity(l)
					.build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear pedido", description = "genera un nuevo pedido en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Pedido creado exitosamente"),
			@ApiResponse(responseCode= "404", description = "Pedido no encontrado en la base de datos"),
			@ApiResponse(responseCode= "409", description = "Persona ya creo un pedido para esta ronda")
	})
	public Response crear(Pedido p) {
		//cuando el usuario se registra o inicia sesion se llama este metodo
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if (aux == null) { // no se creo el pedido
			p.setEstado("Editable");
			pdao.agregarPedido(p);
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya esta creado el pedido
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	@PUT
	@Path("/editable")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar pedido", description = "modifica un pedido de la base de datos para agregar productos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a editar")
	})
	public Response editar(Pedido p) {
		//Se llama cuando el usuario agrega un producto al carro o modifica su direccion o punto de entrega
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null) && (aux.getEstado().equals("Editable"))) { // pedido perteneciente a la ronda
			aux.setEstado("Editable");
			aux.setTotal(p.getTotal()+aux.getTotal());
			List<Producto> l = aux.getProductos();
			l.add(p.getProductos().get(0));
			aux.setProductos(l);
			pdao.actualizarPedido(aux);
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya cerro la ronda
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}
	
	@PUT
	@Path("/editable2")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar pedido", description = "modifica un pedido de la base de datos para eliminar productos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a editar")
	})
	public Response editarproductos(Pedido p) {
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null) && (aux.getEstado().equals("Editable"))) { // pedido perteneciente a la ronda
			aux.setEstado("Editable");
			aux.setTotal(aux.getTotal()-p.getTotal());
			List<Producto> l = aux.getProductos();
			Long prodaeliminar=p.getProductos().get(0).getId();
			Iterator<Producto> iterator = l.iterator();
			while (iterator.hasNext()) {
			    Producto prod = iterator.next();
			    if (prod.getId() == prodaeliminar) {
			        iterator.remove();
			    }
			}
			aux.setProductos(l);
			pdao.actualizarPedido(aux);
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya cerro la ronda
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}
	
	@PUT
	@Path("/vaciar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "vaciar pedido", description = "Vacia el carrito")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a editar")
	})
	public Response vaciarproductos(Pedido p) {
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null) && (aux.getEstado().equals("Editable"))) { // pedido perteneciente a la ronda
			aux.setTotal(0);
			aux.setProductos(p.getProductos());
			pdao.actualizarPedido(aux);
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya cerro la ronda
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}
	
	@PUT
	@Path("/confirmado")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Terminar pedido", description = "Finaliza el pedido tras agregar todos los productos y el metodo de envio")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido confirmado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a confirmar")
	})
	public Response editar2(Pedido p) {
		//Se llama cuando el usuario da a confirmar pedido
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null) && (aux.getEstado().equals("Editable"))) { // pedido perteneciente a la ronda
			aux.setPuntoRetiro(p.getPuntoRetiro());
			aux.setDireccion(p.getDireccion());
			aux.setTipoEntrega(p.getTipoEntrega());
			aux.setEstado("Confirmado");
			pdao.actualizarPedido(aux);
			List<Producto> lprod =aux.getProductos();
			for (Producto prod : lprod) {
				prod.setStock(prod.getStock()-1);
				proddao.actualizarProducto(prod);
			}
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya cerro la ronda
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}
	
	@PUT
	@Path("/modificar")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Modificar pedido", description = "Vuelve a habilitar al usuario para editar su pedido")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido en estado de modificacion correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a modificar")
	})
	public Response modificarnuevamente(Pedido p) {
		//Se llama cuando ya se confirmo el pedido y se quiere modificar el mismo antes del fin de ronda
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null) && (aux.getEstado().equals("Confirmado"))) { // pedido perteneciente a la ronda
			aux.setEstado("Editable");
			pdao.actualizarPedido(aux);
			List<Producto> lprod =aux.getProductos();
			for (Producto prod : lprod) {
				prod.setStock(prod.getStock()+1);
				proddao.actualizarProducto(prod);
			}
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya cerro la ronda
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}
	
	@PUT
	@Path("/repetir")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Repetir pedido", description = "Repite pedido anterior")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido repetido correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al repetir pedido")
	})
	public Response repetirpedido(Pedido p) {
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null)) {
			aux.setDireccion(p.getDireccion());
			aux.setFecha(p.getFecha());
			aux.setProductos(p.getProductos());
			aux.setPuntoRetiro(p.getPuntoRetiro());
			aux.setRonda(p.getRonda());
			aux.setTipoEntrega(p.getTipoEntrega());
			aux.setTotal(p.getTotal());
			aux.setVisitante(p.getVisitante());
			aux.setEstado("Editable");
			pdao.actualizarPedido(aux);
			return Response.status(Response.Status.CREATED).build();
		} else {
			//ya cerro la ronda
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}
	
	@PUT
	@Path("/entregado")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Marcar pedido como entregado", description = "Marca un pedido como ya entregado")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Pedido en estado de entregado"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a entregar")
	})
	public Response entregarPedido(Pedido p) {
		Pedido aux=pdao.getPedido(p.getVisitante().getId(),p.getRonda().getNroRonda());
		if ((aux != null) && (aux.getEstado().equals("Confirmado"))) { 
			aux.setEstado("Entregado");
			pdao.actualizarPedido(aux);
			return Response.status(Response.Status.CREATED).build();
		} else {
			return Response.status(Response.Status.CONFLICT).build();	
		 }
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Cancelar pedido por id", description = "se cancela el pedido de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Pedido cancelado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el pedido a cancelar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Pedido aux=pdao.getPedido(id);
		if ((aux != null) && (aux.getEstado().equals("Confirmado"))) {
			aux.setEstado("Editable");
			List<Producto> lprod =new ArrayList<Producto>(aux.getProductos());
			aux.setProductos(new ArrayList<Producto>());
			aux.setDireccion(null);
			aux.setPuntoRetiro(null);
			aux.setTotal(0);
			pdao.actualizarPedido(aux);
			for (Producto prod : lprod) {
				prod.setStock(prod.getStock()+1);
				proddao.actualizarProducto(prod);
			}
			return Response.noContent().build();
		} else {
			mensaje = "No existe el pedido con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
	
}
