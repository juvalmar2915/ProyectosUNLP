package grupo2.resources;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
		info = @Info(
			title = "API",
			version = "3.0.1",
			description = "API de ejemplo para Swagger"
		),
		  servers = {
				  @Server(url = "http://localhost:8080/El_Paseo_Te_Lo_Lleva_Paladino_Blanco/rest/"),
		  }
		)
public class ApiConfig {

}
