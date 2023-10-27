package grupo2.resources;

import java.io.IOException;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.PreMatching;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@Provider
@PreMatching
public class Intercepter implements ContainerRequestFilter{

	@Override
	public void filter(ContainerRequestContext request) throws IOException {
		/*String httpMethod = request.getMethod();
	    System.out.println("HTTP method: " + httpMethod);*/
		//|| url.equals("http://localhost:8080/El_Paseo_Te_Lo_Lleva_Paladino_Blanco/rest/admins")
		String url = request.getUriInfo().getAbsolutePath().toString();
		System.out.println("Url "+url);
		if(url.contains("/rest/auth") || url.equals("http://localhost:4200/El_Paseo_Te_Lo_Lleva_Paladino_Blanco/rest/visitantes")) {
			return;
		}
		String token = request.getHeaderString("Authorization");
		System.out.println("Token recibido: "+token);
		try {
			String key = "es re privada mi clave";
			Algorithm algorithm = Algorithm.HMAC256(key);
			DecodedJWT jwt = JWT.require(algorithm)
			        .build()
			        .verify(token);
	        System.out.println("Expira: "+jwt.getExpiresAt());
		} catch (JWTVerificationException e){
			System.out.println("Fallo en la validacion");
			e.printStackTrace();
	        ObjectMapper objectMapper = new ObjectMapper();
	        ObjectNode jsonObject = objectMapper.createObjectNode();
	        jsonObject.put("mensaje", "Credenciales incorrectas");
			request.abortWith( Response.status(Response.Status.UNAUTHORIZED).entity(jsonObject).build());
		}
		
	}

}


