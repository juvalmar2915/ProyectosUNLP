package grupo2.resources;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Base64;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import grupo2.dao.IProductorDAO;
import grupo2.dao.ProductoDAO;
import grupo2.model.Producto;
import grupo2.model.Productor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.tags.Tags;
import jakarta.inject.Inject;
import jakarta.servlet.ServletContext;
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
import jakarta.ws.rs.core.Response.ResponseBuilder;
import jakarta.ws.rs.core.UriInfo;

@Path("/imagen")
@Tags(value= {@Tag(name="Imagen",description="Metodos de Iagen")})
public class ImagenResource {
	
	@Inject
	private IProductorDAO pdao;
	@Inject
	private ProductoDAO proddao;
	@POST
    @Path("/producto/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @ApiResponses(value = { 
        @ApiResponse(responseCode =  "200", description =  "Successful operation"),
        @ApiResponse(responseCode = "400", description = "Bad Request"),
        @ApiResponse(responseCode = "404", description = "Invalid data"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error") 
    })
    public Response uploadFileProducto(@PathParam("id") long id, 
                               @FormDataParam("file") InputStream fileInputStream,
                               @FormDataParam("file") FormDataContentDisposition fileMetaData) throws Exception {
		try {
			Producto p =proddao.getProducto(id);
            // Leer la imagen como un arreglo de bytes
            byte[] imageData = fileInputStream.readAllBytes();
            
            // Guardar la imagen en el sistema de archivos
            Instant instant = Instant.now();
            String fileName = instant.toString();
            String fileNamesinespeciales = fileName.replace(":", "-");
            
            String rutaClase = ImagenResource.class.getProtectionDomain().getCodeSource().getLocation().getPath();
            File proyectoDirectorio = new File(rutaClase).getParentFile().getParentFile();
            while (proyectoDirectorio.getAbsolutePath().contains(".metadata")) {
                proyectoDirectorio= proyectoDirectorio.getParentFile();
            }
            String filePath = proyectoDirectorio+ "/El_Paseo_Te_Lo_Lleva_Paladino_Blanco/src/img/" + fileNamesinespeciales; // Ruta donde se guardará la imagen
            
            System.out.println(filePath);
            p.setFoto(filePath);
            proddao.actualizarProducto(p);
            FileOutputStream outputStream = new FileOutputStream(filePath);
            outputStream.write(imageData);
            outputStream.close();

            return Response.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al guardar la imagen").build();
        }
    }

	@POST
    @Path("/productor/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @ApiResponses(value = { 
        @ApiResponse(responseCode =  "200", description =  "Successful operation"),
        @ApiResponse(responseCode = "400", description = "Bad Request"),
        @ApiResponse(responseCode = "404", description = "Invalid data"),
        @ApiResponse(responseCode = "500", description = "Internal Server Error") 
    })
    public Response uploadFileProductor(@PathParam("id") long id, 
                               @FormDataParam("file") InputStream fileInputStream,
                               @FormDataParam("file") FormDataContentDisposition fileMetaData) throws Exception {
		try {
			Productor p =pdao.getProductor(id);
            // Leer la imagen como un arreglo de bytes
            byte[] imageData = fileInputStream.readAllBytes();
            
            // Guardar la imagen en el sistema de archivos
            Instant instant = Instant.now();
            String fileName = instant.toString();
            String fileNamesinespeciales = fileName.replace(":", "-");
            
            String rutaClase = ImagenResource.class.getProtectionDomain().getCodeSource().getLocation().getPath();
            File proyectoDirectorio = new File(rutaClase).getParentFile().getParentFile();
            while (proyectoDirectorio.getAbsolutePath().contains(".metadata")) {
                proyectoDirectorio= proyectoDirectorio.getParentFile();
            }
            String filePath = proyectoDirectorio+ "/El_Paseo_Te_Lo_Lleva_Paladino_Blanco/src/img/" + fileNamesinespeciales; // Ruta donde se guardará la imagen
            
            System.out.println(filePath);
            p.setFoto(filePath);
            pdao.actualizarProductor(p);
            FileOutputStream outputStream = new FileOutputStream(filePath);
            outputStream.write(imageData);
            outputStream.close();

            return Response.ok().build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error al guardar la imagen").build();
        }
    }
	
	
	
	
    @GET
    @Path("/producto/{id}")
    @Produces("application/json")
    @ApiResponses(value = { 
    		@ApiResponse(responseCode =  "200", description =  "Successful operation"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Invalid data"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error") 
    })
    public Response downloadImageFileProducto(@PathParam("id") long id) throws IOException {
    	Producto p = proddao.getProducto(id);
    	java.nio.file.Path path = Paths.get(p.getFoto());
    	byte[] imagenData = Files.readAllBytes(path);
    	String encodeBase64 = Base64.getEncoder().encodeToString(imagenData);
    	return Response.ok()
    			.entity(encodeBase64)
                .build();
    }
    @GET
    @Path("/productor/{id}")
    @Produces("application/json")
    @ApiResponses(value = { 
    		@ApiResponse(responseCode =  "200", description =  "Successful operation"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Invalid data"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error") 
    })
    public Response downloadImageFileProductor(@PathParam("id") long id) throws IOException {
    	Productor p = pdao.getProductor(id);
    	java.nio.file.Path path = Paths.get(p.getFoto());
    	byte[] imagenData = Files.readAllBytes(path);
    	String encodeBase64 = Base64.getEncoder().encodeToString(imagenData);
    	return Response.ok()
    			.entity(encodeBase64)
                .build();
    }
}
