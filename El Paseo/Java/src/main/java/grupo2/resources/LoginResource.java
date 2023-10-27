package grupo2.resources;

import grupo2.dao.*;
import grupo2.model.*;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.ws.rs.core.*;
import netscape.javascript.JSObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import java.util.*;
import java.util.Iterator;
import com.auth0.jwt.*;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


@Path("auth")
@Tags(value= {@Tag(name="Sesiones",description="Metodos de sesion")})
public class LoginResource {
	@Context
	UriInfo uriInfo;
	
	@Context
	Request request;
	
	@Inject
	private IVisitanteDAO vdao;
	
	@Inject
	private IAdminDAO adao;
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response validarDatos(Visitante visitante){
		boolean status = false;
		boolean existe=false;
		String rol="loguear";
		Long id=null;
		
		//Checkeo si es visitante
		List<Visitante> l = vdao.getVisitantes();
		Iterator<Visitante> iterator = l.iterator();
		Visitante v;
		while (iterator.hasNext() && !existe) {
		    v = iterator.next();
		    if (v.getEmail().equals(visitante.getEmail()) && !(v.isBorrado())){
		    	existe=true;
		    	if (v.getContraseña().equals(visitante.getContraseña())){
		    		status=true;
		    		rol = "visitante";
		    		id = v.getId();
		    		break;
		    	}
		    }
		}
		
		//Si no es visitante me fijo si es admin
		if (!existe) {
			List<Admin> la = adao.getAdmins();
			Iterator<Admin> iteratora = la.iterator();
			Admin a;
			while (iteratora.hasNext() && !existe) {
			    a = iteratora.next();
			    if (a.getEmail().equals(visitante.getEmail())){
			    	existe=true;
			    	if (a.getContraseña().equals(visitante.getContraseña())){
			    		status=true;
			    		rol = "admin";
			    		id = a.getId();
			    		break;
			    	}
			    }
			}
		}
		
		//Si el mail no esta en la base de datos
		if(!existe) {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
		//Si el mail se encuentra pero la contraseña es incorrecta
		if(!status) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
		//Si los datos son correctos
		String key = "es re privada mi clave";
		Algorithm algorithm = Algorithm.HMAC256(key);
		long tiempo = System.currentTimeMillis();
		String jwt = JWT.create()
				.withSubject(visitante.getNombre())
		        .withClaim("id", visitante.getId())
		        .withClaim("email", visitante.getEmail())
		        .withIssuedAt(new Date(tiempo))
		        .withExpiresAt(new Date(tiempo+1800000))
		        .sign(algorithm);
        // Crear objeto ObjectMapper de Jackson
        ObjectMapper objectMapper = new ObjectMapper();
        // Crear el objeto JSON con un atributo llamado "token"
        ObjectNode jsonObject = objectMapper.createObjectNode();
        jsonObject.put("token", jwt);
        jsonObject.put("rol", rol);
        jsonObject.put("id", id);
		return Response.status(Response.Status.CREATED).entity(jsonObject).build();
	}

}
