package grupo2.resources;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

import grupo2.dao.IProductoDAO;
import grupo2.dao.IVisitanteDAO;
import grupo2.dao.ProductoDAO;
import grupo2.model.Pedido;
import grupo2.model.Producto;
import grupo2.model.Visitante;
import io.swagger.v3.oas.annotations.Operation;
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

@Path("productos")
@Tags(value= {@Tag(name="Productos",description="Metodos de Productos")})
public class ProductoResource {

	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	@Inject
	private ProductoDAO pdao;
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener productos", description = "se listan todos los productos de la base de datos")
	public List<Producto> getAll() throws IOException{
		List<Producto> lp = pdao.getProductos();
		for (Producto prod : lp) {
			java.nio.file.Path path = Paths.get(prod.getFoto());
	    	byte[] imagenData = Files.readAllBytes(path);
	    	String encodeBase64 = "data:image/jpeg;base64,"+Base64.getEncoder().encodeToString(imagenData);
			prod.setFoto(encodeBase64);
		}
		return lp;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener producto por id", description = "se lista el producto de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicho producto y es listado"),
			@ApiResponse(responseCode= "404", description = "Producto no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Producto p = pdao.getProducto(id);
		if (p != null){
			if (!p.isBorrado()) {
				return Response
						.ok()
						.entity(p)
						.build();
			}
			else {
				mensaje="No se encontró el producto";
				return Response
						.status(Response.Status.NOT_FOUND)
						.entity(mensaje)
						.build();
			}
		} else {
			mensaje="No se encontró el producto";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@GET
	@Path("/categoria/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener productos por categoria", description = "se recuperan los productos de una categoria")
	public Response encontrar2(@PathParam("id") Long id) throws IOException{
		List<Producto> l= pdao.getProductosbycategoria(id);
		for (Producto prod : l) {
			java.nio.file.Path path = Paths.get(prod.getFoto());
	    	byte[] imagenData = Files.readAllBytes(path);
	    	String encodeBase64 = "data:image/jpeg;base64,"+Base64.getEncoder().encodeToString(imagenData);
			prod.setFoto(encodeBase64);
		}
			return Response
					.ok()
					.entity(l)
					.build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear producto", description = "genera un nuevo producto en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Producto creado correctamente"),
			@ApiResponse(responseCode= "409", description = "Producto sin precio o nombre")
	})
	public Response crear(Producto p) {
		if ( !(p.getNombre().equals("")) || !(p.getPrecio()>0)) {
			pdao.agregarProducto(p);
			return Response.status(Response.Status.CREATED).entity(p).build();
		}
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar producto", description = "modifica un producto de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Producto editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el producto a editar"),
	})
	public Response editar(Producto p) {
		Producto aux = pdao.getProducto(p.getId());
		if ( (aux != null) && (aux.isBorrado()==false)) {
			pdao.actualizarProducto(p);
			return Response.ok().entity(p).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar producto por id", description = "se borra logicamente el producto de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Producto eliminado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el producto a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Producto aux = pdao.getProducto(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			pdao.eliminarProducto(aux);
			return Response.noContent().build();
		} else {
			mensaje = "No existe el Producto con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
}
