package grupo2.resources;

import java.util.List;

import grupo2.dao.DireccionDAO;
import grupo2.dao.Punto_RetiroDAO;
import grupo2.dao.VisitanteDAO;
import grupo2.model.Direccion;
import grupo2.model.Producto;
import grupo2.model.Punto_Retiro;
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

@Path("puntosretiro")
@Tags(value= {@Tag(name="Puntos de Retiro",description="Metodos de Punto de Retiro")})
public class Punto_RetiroResource {

	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	
	@Inject
	private VisitanteDAO vdao;
	
	@Inject
	private Punto_RetiroDAO pdao;
	
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener puntos de retiro", description = "se listan todos los puntos de retiro de la base de datos")
	public List<Punto_Retiro> getAll() {
		return pdao.getPuntosdeRetiro();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener puntos de retiro por id", description = "se listan los puntos de retiro de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicho punto de retiro y es listado"),
			@ApiResponse(responseCode= "404", description = "Punto de retiro no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Punto_Retiro p = pdao.getPuntoRetiro(id);
		
		if (p != null){
			return Response
					.ok()
					.entity(p)
					.build();
		} else {
			mensaje="No se encontró el punto de retiro";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear punto de retiro", description = "genera un nuevo punto de retiro en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Punto de retiro creado exitosamente"),
	})
	public Response crear(Punto_Retiro p) {
		pdao.agregarPuntoRetiro(p);
		return Response.status(Response.Status.CREATED).build();
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar punto retiro", description = "modifica un punto de retiro de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Punto de retiro editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el punto de retiro a editar"),
	})
	public Response editar(Punto_Retiro p) {
		Punto_Retiro aux = pdao.getPuntoRetiro(p.getId());
		if ( (aux != null) && (aux.isBorrado()==false)) {
			pdao.actualizarPuntoRetiro(p);
			return Response.ok().entity(p).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar punto de retiro por id", description = "se borra logicamente el punto de retiro de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Punto de retiro eliminado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el punto de retiro a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Punto_Retiro aux = pdao.getPuntoRetiro(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			pdao.eliminarPuntoRetiro(aux);
			return Response.noContent().build();
		} else {
			mensaje = "No existe el Producto con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
}
