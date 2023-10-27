package grupo2.resources;
import grupo2.dao.*;
import grupo2.model.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.ws.rs.core.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import java.util.*;

import org.jvnet.hk2.annotations.Contract;



@Path("visitantes")
@Tags(value= {@Tag(name="Visitantes",description="Metodos de Visitantes")})
public class VisitanteResource {
	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	@Inject
	private IVisitanteDAO vdao; //= FactoriaDAO.getVisitanteDAO();
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener visitantes", description = "se listan todos los visitantes de la base de datos")
	public List<Visitante> getAll() {
		return vdao.getVisitantes();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener visitante por id", description = "se lista el visitante de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicho Visitante y es listado"),
			@ApiResponse(responseCode= "404", description = "Visitante no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Visitante v = vdao.getVisitante(id);
		if (v != null){
			if (!v.isBorrado()) {
				return Response
						.ok()
						.entity(v)
						.build();
			}
			else {
				mensaje="No se encontró el visitante";
				return Response
						.status(Response.Status.NOT_FOUND)
						.entity(mensaje)
						.build();
			}
		} else {
			mensaje="No se encontró el visitante";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear visitante", description = "genera un nuevo visitante en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Visitante creado correctamente"),
			@ApiResponse(responseCode= "404", description = "Visitante no encontrado en la base de datos"),
			@ApiResponse(responseCode= "409", description = "Visitante ya se encuentra en la base de datos debido al mail de tipo unico (imposibilidad de crearlo)")
	})
	public Response crear(Visitante visitante) {
		if ( !(visitante.getContraseña().equals("")) && !(visitante.getEmail().equals(""))) {
			Visitante aux=vdao.getVisitante(visitante.getEmail());
			if (aux == null) { 
				vdao.agregarVisitante(visitante);
				return Response.status(Response.Status.CREATED).build();
			} else {
				if (aux.isBorrado()) {
					vdao.agregarVisitante(visitante);
					return Response.status(Response.Status.CREATED).build();
				}
				else {
					return Response.status(Response.Status.CONFLICT).build();
				}
				
			}
		}
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar visitante", description = "modifica un visitante de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Visitante editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el visitante a editar"),
			@ApiResponse(responseCode= "500", description = "Visitante ya se encuentra en la base de datos debido al mail de tipo unico (imposibilidad de editarlo)")
	})
	public Response editar(Visitante visitante) {
		Visitante aux = vdao.getVisitante(visitante.getId());
		if ( (aux != null) && (aux.isBorrado()==false)) {
			vdao.actualizarVisitante(visitante);
			return Response.ok().entity(visitante).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar visitante por id", description = "se borra logicamente el visitante de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Visitante eliminado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el visitante a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Visitante aux = vdao.getVisitante(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			vdao.eliminarVisitante(aux);
			return Response.noContent().build();
		} else {
			mensaje = "No existe el Visitante con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}

}
