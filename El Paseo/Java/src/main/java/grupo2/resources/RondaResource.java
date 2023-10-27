package grupo2.resources;

import java.util.List;

import grupo2.dao.RondaDAO;
import grupo2.model.Producto;
import grupo2.model.Ronda;
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

@Path("rondas")
@Tags(value= {@Tag(name="Rondas",description="Metodos de Ronda")})
public class RondaResource {
	
	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	
	@Inject
	private RondaDAO rdao;
	
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener rondas", description = "se listan todas las rondas de la base de datos")
	public List<Ronda> getAll() {
		return rdao.getRondas();
	}

	@GET
	@Path("/{nroRonda}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener ronda por id", description = "se lista la ronda de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicha Ronda y es listada"),
			@ApiResponse(responseCode= "404", description = "Ronda no encontrada en la base de datos")
	})
	public Response encontrar(@PathParam("nroRonda") Long nroRonda){
		Ronda r = rdao.getRonda(nroRonda);
		
		if (r != null){
			return Response
					.ok()
					.entity(r)
					.build();
		} else {
			mensaje="No se encontró la Ronda";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear ronda", description = "genera una nueva Ronda en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Ronda creada exitosamente"),
	})
	public Response crear(Ronda r) {
		rdao.agregarRonda(r);
		return Response.status(Response.Status.CREATED).build();
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar ronda", description = "modifica una ronda de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Ronda editada correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar la Ronda a editar")
	})
	public Response editar(Ronda r) {
		Ronda aux = rdao.getRonda(r.getNroRonda());
		if ( aux != null) {
			rdao.actualizarRonda(r);
			return Response.ok().entity(r).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}
	
	@DELETE
	@Path("/{nroRonda}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar ronda por id", description = "se borra logicamente la ronda de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Ronda eliminada correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar la ronda a eliminar")
	})
	public Response borrar(@PathParam("nroRonda") Long nroRonda) {
		Ronda aux = rdao.getRonda(nroRonda);
		if ((aux != null) && (aux.isBorrado()==false)) {
			rdao.eliminarRonda(aux);
			return Response.noContent().build();
		} else {
			mensaje = "No existe la Ronda con ese numero";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
}
