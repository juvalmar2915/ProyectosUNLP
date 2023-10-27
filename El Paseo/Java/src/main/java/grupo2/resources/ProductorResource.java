package grupo2.resources;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import grupo2.dao.IProductoDAO;
import grupo2.dao.IProductorDAO;
import grupo2.dao.ProductoDAO;
import grupo2.dao.ProductorDAO;
import grupo2.model.Producto;
import grupo2.model.Productor;
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

@Path("productores")
@Tags(value= {@Tag(name="Productores",description="Metodos de Productor")})
public class ProductorResource {

	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	private String mensaje;
	@Inject
	private IProductorDAO pdao;
	@Inject
	private ProductoDAO proddao;
	
	@GET
	@Path("/todos")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener productores", description = "se listan todos los productores de la base de datos")
	public List<Productor> getAll()  throws IOException{
		List<Productor> lp = pdao.getProductores();
		for (Productor p : lp) {
			java.nio.file.Path path = Paths.get(p.getFoto());
	    	byte[] imagenData = Files.readAllBytes(path);
	    	String encodeBase64 = "data:image/jpeg;base64,"+Base64.getEncoder().encodeToString(imagenData);
			p.setFoto(encodeBase64);
		}
		return lp;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Operation(summary = "Obtener producto por id", description = "se lista el productor de interes de la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Se encontro dicho productor y es listado"),
			@ApiResponse(responseCode= "404", description = "Productor no encontrado en la base de datos")
	})
	public Response encontrar(@PathParam("id") Long id){
		Productor p = pdao.getProductor(id);
		if (p != null){
			if (!p.isBorrado()) {
				return Response
						.ok()
						.entity(p)
						.build();
			}
			else {
				mensaje="No se encontró el productor";
				return Response
						.status(Response.Status.NOT_FOUND)
						.entity(mensaje)
						.build();
			}
		} else {
			mensaje="No se encontró el productor";
			return Response
					.status(Response.Status.NOT_FOUND)
					.entity(mensaje)
					.build();
		}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Crear productor", description = "genera un nuevo productor en la base de datos")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "201", description = "Productor creado correctamente"),
			@ApiResponse(responseCode= "409", description = "Productor sin nombre")
	})
	public Response crear(Productor p) {
		if ( !(p.getNombre().equals(""))) {
			pdao.agregarProductor(p);
			return Response.status(Response.Status.CREATED).entity(p).build();
		}
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Operation(summary = "Editar productor", description = "modifica un productor de la base de datos ")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "200", description = "Productor editado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el productor a editar"),
	})
	public Response editar(Productor p) {
		Productor aux = pdao.getProductor(p.getId());
		if ( (aux != null) && (aux.isBorrado()==false)) {
			pdao.actualizarProductor(p);
			return Response.ok().entity(p).build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("[]").build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.TEXT_PLAIN)
	@Operation(summary = "Eliminar productor por id", description = "se borra logicamente el productor de interes")
	@ApiResponses(value= {
			@ApiResponse(responseCode= "204", description = "Productor eliminado correctamente"),
			@ApiResponse(responseCode= "404", description = "Fallo al encontrar el productor a eliminar")
	})
	public Response borrar(@PathParam("id") Long id) {
		Productor aux = pdao.getProductor(id);
		if ((aux != null) && (aux.isBorrado()==false)) {
			pdao.eliminarProductor(aux);
			List<Producto> l = proddao.getProductosbyproductor(id);
			Iterator<Producto> iterator = l.iterator();
			while (iterator.hasNext()) {
			    Producto prod = iterator.next();
			    proddao.eliminarProducto(prod);
			}
			return Response.noContent().build();
		} else {
			mensaje = "No existe el Productor con ese id";
			return Response.status(Response.Status.NOT_FOUND).entity(mensaje).build();
		}
	}

}
