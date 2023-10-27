package grupo2.resources;

import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;

public class AppConfig extends ResourceConfig {

	public AppConfig() {

//Jersey multipart para subir achivos
		register(MultiPartFeature.class);

		// IoC con Hk2

		// Bind
		register(new MyApplicationCustomizer());
		packages(true, "grupo2.*");
	}
}
