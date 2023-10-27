package grupo2.resources;

import java.util.List;

import grupo2.dao.DireccionDAO;
import grupo2.dao.VisitanteDAO;
import grupo2.model.Direccion;
import grupo2.model.Productor;
import grupo2.model.Ronda;
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

@Path("direcciones")
@Tags(value= {@Tag(name="Direccion",description="Metodos de Direccion")})
public class DireccionResource {
	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	
	@Inject
	private VisitanteDAO vdao;
	
	@Inject
	private DireccionDAO ddao;
	
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener direcciones", description = "se listan todas las direcciones de la base de datos")
	public List<Direccion> getAll() {
		return ddao.getDirecciones();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener direcciones del visitante de id", description = "se listan las direcciones de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicha Ronda y es listada"),
			@ApiResponse(responseCode= "404", description = "Ronda no encontrada en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Visitante v= vdao.getVisitante(id);
		List<Direccion> l= ddao.getDireccionesdeunVisitante(v);
		return Response
				.ok()
				.entity(l)
				.build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear direccion", description = "genera una nueva direccion en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Direccion creada exitosamente"),
	})
	public Response crear(Direccion d) {
		ddao.agregarDireccion(d);
		return Response.status(Response.Status.CREATED).entity(d).build();
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar direccion", description = "modifica una direccion de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Direccion editada correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar la Direccion a editar")
	})
	public Response editar(Direccion d) {
		Direccion aux = ddao.getDireccion(d.getId());
		if ( aux != null) {
			ddao.actualizarDireccion(d);
			return Response.ok().entity(d).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar direccion por id", description = "se borra logicamente la direccion de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Direccion eliminada correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar la direccion a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Direccion aux = ddao.getDireccion(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			ddao.eliminarDireccion(aux);
			return Response.noContent().build();
		} else {
			mensaje = "No existe la direccion con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}

}
