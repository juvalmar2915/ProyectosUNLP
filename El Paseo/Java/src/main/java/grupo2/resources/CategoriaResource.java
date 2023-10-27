package grupo2.resources;

import java.util.Iterator;
import java.util.List;

import grupo2.dao.AdminDAO;
import grupo2.dao.CategoriaDAO;
import grupo2.dao.ProductoDAO;
import grupo2.model.Admin;
import grupo2.model.Categoria;
import grupo2.model.Producto;
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

@Path("categorias")
@Tags(value= {@Tag(name="Categorias",description="Metodos de Categoria")})
public class CategoriaResource {

	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	
	@Inject
	private CategoriaDAO cdao;
	
	@Inject
	private ProductoDAO pdao;
	
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener categorias", description = "se listan todas las categorias de la base de datos")
	public List<Categoria> getAll() {
		return cdao.getCategorias();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener categoria por id", description = "se lista la categoria de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicha Categoria y es listada"),
			@ApiResponse(responseCode= "404", description = "Categoria no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Categoria c = cdao.getCategoria(id);
		
		if (c != null){
			return Response
					.ok()
					.entity(c)
					.build();
		} else {
			mensaje="No se encontró la categoria";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear categoria", description = "genera una nueva categoria en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Categoria creado exitosamente"),
	})
	public Response crear(Categoria categoria) {
		cdao.agregarCategoria(categoria);
		return Response.status(Response.Status.CREATED).build();
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar categoria", description = "modifica una categoria de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Categoria editada correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar la categoria a editar"),
	})
	public Response editar(Categoria c) {
		Categoria aux = cdao.getCategoria(c.getId());
		if ( (aux != null) && (aux.isBorrado()==false)) {
			cdao.actualizarCategoria(c);
			return Response.ok().entity(c).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar categoria por id", description = "se borra logicamente la categoria de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "categoria eliminada correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar la categoria a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Categoria aux = cdao.getCategoria(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			cdao.eliminarCategoria(aux);
			List<Producto> l = pdao.getProductosbycategoria(id);
			Iterator<Producto> iterator = l.iterator();
			while (iterator.hasNext()) {
			    Producto prod = iterator.next();
			    pdao.eliminarProducto(prod);
			}
			return Response.noContent().build();
		} else {
			mensaje = "No existe la categoria con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}

}
