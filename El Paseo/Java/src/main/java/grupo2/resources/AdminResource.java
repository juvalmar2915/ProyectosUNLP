package grupo2.resources;

import java.util.List;

import grupo2.dao.AdminDAO;
import grupo2.model.Admin;
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

@Path("admins")
@Tags(value= {@Tag(name="Admins",description="Metodos de Admin")})
public class AdminResource {
	
	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	
	@Inject
	private AdminDAO adao;// = FactoriaDAO.getAdminDAO();
	
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener admins", description = "se listan todos los admins de la base de datos")
	public List<Admin> getAll() {
		return adao.getAdmins();
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener admin por id", description = "se lista el admin de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicho Admin y es listado"),
			@ApiResponse(responseCode= "404", description = "Admin no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Admin a = adao.getAdmin(id);
		
		if (a != null){
			return Response
					.ok()
					.entity(a)
					.build();
		} else {
			mensaje="No se encontró el admin";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear admin", description = "genera un nuevo admin en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Admin creado exitosamente"),
			@ApiResponse(responseCode= "404", description = "Admin no encontrado en la base de datos"),
			@ApiResponse(responseCode= "409", description = "Admin ya se encuentra en la base de datos debido al mail de tipo unico (imposibilidad de crearlo)")
	})
	public Response crear(Admin admin) {
		Admin aux=adao.getAdmin(admin.getEmail());
		if (aux == null) { 
			adao.agregarAdmin(admin);
			return Response.status(Response.Status.CREATED).build();
		} else {
			if (aux.isBorrado()) {
				adao.agregarAdmin(admin);
				return Response.status(Response.Status.CREATED).build();
			}
			else {
				return Response.status(Response.Status.CONFLICT).build();
			}
			
		}
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar admin", description = "modifica un admin de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Admin editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el admin a editar"),
			@ApiResponse(responseCode= "500", description = "Admin ya se encuentra en la base de datos debido al mail de tipo unico (imposibilidad de editarlo)")
	})
	public Response editar(Admin a) {
		Admin aux = adao.getAdmin(a.getId());
		if ( (aux != null) && (aux.isBorrado()==false)) {
			adao.actualizarAdmin(a);
			return Response.ok().entity(a).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar admin por id", description = "se borra logicamente el admin de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Admin eliminado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el admin a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Admin aux = adao.getAdmin(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			adao.eliminarAdmin(aux);
			return Response.noContent().build();
		} else {
			mensaje = "No existe el admin con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}
}
