package grupo2.controller;
import java.util.*;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalTime;

import grupo2.dao.*;
import grupo2.model.Categoria;
import grupo2.model.Direccion;
import grupo2.model.Pedido;
import grupo2.model.Producto;
import grupo2.model.Productor;
import grupo2.model.Ronda;
import grupo2.model.Visitante;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class testservlet
 */
@WebServlet("/testservlet")
public class testservlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public testservlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

//		IPedidoDAO pedidonuevoFactoriaDAO.getPedidoDAO();
//
//		IVisitanteDAO visitantenuevoFactoriaDAO.getVisitanteDAO();
//	
//		IDireccionDAO direcnuevoFactoriaDAO.getDireccionDAO();
//		
//		ICategoriaDAO catnuevo=FactoriaDAO.getCategoriaDAO();
//	
//		IProductoDAO productonuevo=FactoriaDAO.getProductoDAO();
//		
//		IProductorDAO productornuevo=FactoriaDAO.getProductorDAO();
//		
//		IRondaDAO rondanuevo=FactoriaDAO.getRondaDAO();	

//		System.out.println("Elija que realizar en la base de datos:");
//		System.out.println("1: generar un pedido a mano");
//		System.out.println("2: generar un pedido con datos precargados");
//		System.out.println("3: obtener listado de productos para una categoria");
//		System.out.println("4: agregar un visitante a la base de datos");
//		System.out.println("5: editar el visitante agregado en la opcion 4");
//		System.out.println("6: eliminar el visitante de la opcion 4 de la base de datos");
//		
//		Scanner leer=new Scanner(System.in);
//		int menu =leer.nextInt();
//		if (menu==1) {	
//			System.out.println("Ingresara datos para generar un pedido de los mismos:");
//			
//			//direccion
//			System.out.println("Ingrese una direccion:");
//			leer.nextLine();
//			Direccion d=new Direccion();
//			System.out.println("Calle:");
//			d.setCalle(leer.nextLine());
//			System.out.println("Descripcion:");
//			d.setDescripcion(leer.nextLine());
//			System.out.println("Numero:");
//			d.setNumero(leer.nextInt());
//			System.out.println("Piso(En caso de ser una casa ingrese -1):");
//			d.setPiso(leer.nextInt());
//			leer.nextLine();
//			
//			//categoria
//			System.out.println("Ingrese una categoria:");
//			Categoria c=new Categoria();
//			System.out.println("Nombre:");
//			c.setNombre(leer.nextLine());
//			catnuevo.agregarCategoria(c);
//			
//			//productor
//			System.out.println("Ingrese un productor:");
//			Productor productor=new Productor();
//			System.out.println("Descripcion:");
//			productor.setDescripcion(leer.nextLine());
//			System.out.println("Url de la foto:");
//			productor.setFoto(leer.nextLine());
//			System.out.println("Nombre:");
//			productor.setNombre(leer.nextLine());
//			productornuevo.agregarProductor(productor);
//			
//			//productos
//			System.out.println("Ingrese dos producto:");
//			Producto product1=new Producto();
//			product1.setCategoria(c);
//			System.out.println("Descripcion de producto 1:");
//			product1.setDescripcion(leer.nextLine());
//			System.out.println("Url de la foto de producto 1:");
//			product1.setFoto(leer.nextLine());
//			System.out.println("Nombre de producto 1:");
//			product1.setNombre(leer.nextLine());
//			System.out.println("Precio de producto 1:");
//			product1.setPrecio(leer.nextDouble());
//			product1.setProductor(productor);
//			System.out.println("Stock de producto 1:");
//			product1.setStock(leer.nextInt());
//			leer.nextLine();
//			Producto product2=new Producto();
//			product2.setCategoria(c);
//			System.out.println("Descripcion de producto 2:");
//			product2.setDescripcion(leer.nextLine());
//			System.out.println("Url de la foto de producto 2:");
//			product2.setFoto(leer.nextLine());
//			System.out.println("Nombre de producto 2:");
//			product2.setNombre(leer.nextLine());
//			System.out.println("Precio de producto 2:");
//			product2.setPrecio(leer.nextDouble());
//			product2.setProductor(productor);
//			System.out.println("Stock de producto 2:");
//			product2.setStock(leer.nextInt());
//			leer.nextLine();
//			productonuevo.agregarProducto(product1);
//			productonuevo.agregarProducto(product2);
//			//ronda
//			
//			Date fecha=Date.from(Instant.now());
//		    Ronda r=new Ronda();    
//		    r.setFechaFin(fecha);
//		    r.setFechaIni(fecha);
//		    r.setFechaRetiro(fecha);
//		    r.setHoraFin(fecha);
//		    r.setHoraIni(fecha);
//		    rondanuevo.agregarRonda(r);
//		    
//		    //visitante
//		    System.out.println("Ingrese un visitante:");
//		    Visitante v1=new Visitante();
//		    System.out.println("Nombre:");
//		    v1.setNombre(leer.nextLine());
//		    System.out.println("Telefono:");
//			v1.setTelefono(leer.nextLine());
//			System.out.println("Mail:");
//			v1.setEmail(leer.nextLine());
//			System.out.println("Contraseña:");
//			v1.setContraseña(leer.nextLine());
//			visitantenuevo.agregarVisitante(v1);
//			d.setVisitante(v1);
//			direcnuevo.agregarDireccion(d);
//			
//			//pedido
//			Pedido p=new Pedido();
//			p.setPuntoRetiro(null);
//			p.setDireccion(d);
//			p.setEstado("Aceptado");
//			List<Producto> l=new ArrayList<Producto>();
//			l.add(product1);
//			l.add(product2);
//			p.setProductos(l);
//			p.setFecha(fecha);
//			p.setRonda(r);
//			p.setTipoEntrega("Envio");
//			p.setTotal(product1.getPrecio()+product2.getPrecio());
//			p.setVisitante(v1);
//		    
//			pedidonuevo.agregarPedido(p);
//		}
//		if (menu==2) {
//			Visitante vact2 = visitantenuevo.getVisitante("lukitas@gmail.com");
//			if(vact2!=null){
//				System.out.println("El pedido ya se encuentra en el sistema");
//			}else{
//				Direccion d=new Direccion();
//				d.setCalle("532");
//				d.setDescripcion("Casa de piedra a mitad de cuadra");
//				d.setNumero(653);
//				d.setPiso(-1);
//				
//				
//				Categoria c=new Categoria();
//				c.setNombre("Golosinas");
//				catnuevo.agregarCategoria(c);
//				
//				Productor productor=new Productor();
//				productor.setDescripcion("Pedro hace golosinas artesanales desde 1980");
//				productor.setFoto("google.com/humano.jpg");
//				productor.setNombre("Pedro Ramirez");
//				productornuevo.agregarProductor(productor);
//				
//				Producto product1=new Producto();
//				product1.setCategoria(c);
//				product1.setDescripcion("Barra de chocolate con mani");
//				product1.setFoto("google.com/shot");
//				product1.setNombre("Barra shot artesanal");
//				product1.setPrecio(50);
//				product1.setProductor(productor);
//				product1.setStock(70);
//				Producto product2=new Producto();
//				product2.setCategoria(c);
//				product2.setDescripcion("Huevo de pascua con confites");
//				product2.setFoto("google.com/huevopascua.jpeg");
//				product2.setNombre("Huevo de pascua artesanal");
//				product2.setPrecio(60);
//				product2.setProductor(productor);
//				product2.setStock(90);
//				productonuevo.agregarProducto(product1);
//				productonuevo.agregarProducto(product2);
//	
//				Date fecha=Date.from(Instant.now());
//			    Ronda r=new Ronda();
//			    r.setFechaFin(fecha);
//			    r.setFechaIni(fecha);
//			    r.setFechaRetiro(fecha);
//			    r.setHoraFin(fecha);
//			    r.setHoraIni(fecha);
//			    rondanuevo.agregarRonda(r);
//			    
//			    Visitante v1=new Visitante();
//			    v1.setNombre("Lucas Bonifacio");
//				v1.setTelefono("+542216413233");
//				v1.setEmail("lukitas@gmail.com");
//				v1.setContraseña("Luki123");
//				visitantenuevo.agregarVisitante(v1);
//				direcnuevo.agregarDireccion(d);
//				Pedido p=new Pedido();
//				p.setPuntoRetiro(null);
//				p.setDireccion(d);
//				p.setEstado("Aceptado");
//				List<Producto> l=new ArrayList<Producto>();
//				l.add(product1);
//				l.add(product2);
//				p.setProductos(l);
//				p.setFecha(fecha);
//				p.setRonda(r);
//				p.setTipoEntrega("Envio");
//				p.setTotal(product1.getPrecio()+product2.getPrecio());
//				p.setVisitante(v1);
//				pedidonuevo.agregarPedido(p);
//			}
//		}
//		if (menu==3) {
//			//Listar datos de una categoria
//	        List<Categoria> lc= catnuevo.getCategorias();
//	        if(!lc.isEmpty()){
//		        Categoria catact=lc.get(0);
//		        Long idC = catact.getId();
//		        Long idP;
//		        List<Producto> productos = (List<Producto>) productonuevo.getProductos();
//		        System.out.println("Imprimiendo productos de categoria " + catact.getNombre());
//		        for(int i=0; i<productos.size(); i++) {
//		            idP = productos.get(i).getCategoria().getId();
//		            if(idP == idC) {
//		                System.out.println(productos.get(i).getNombre());
//		            }
//		        }
//	        }else {
//	        	System.out.println("No hay ninguna categoria en la base de datos");
//	        }
//		}
//		if(menu==4) {
//				//Agregar nuevo visitante
//				Visitante vs = visitantenuevo.getVisitante("juan@gmail.com");
//			 	if(vs!=null) {
//			 		visitantenuevo.agregarVisitante(vs);
//			 	}else{
//			 		Visitante v3=new Visitante();
//				 	v3.setEmail("juan@gmail.com");
//				    v3.setNombre("Juan");
//				    v3.setTelefono("+542312442234");
//			        v3.setContraseña("1234");
//			        visitantenuevo.agregarVisitante(v3);
//			        Direccion d=new Direccion();
//				    d.setCalle("520");
//				    d.setDescripcion("casa piedra");
//				    d.setNumero(3);
//				    d.setPiso(2);
//				    d.setVisitante(v3);
//				    direcnuevo.agregarDireccion(d);
//				    
//				}
//		}
//	    if (menu==5) {			
//	    	//Editar visitante
//			Visitante vact = visitantenuevo.getVisitante("juan@gmail.com");
//			if(vact==null){
//				System.out.println("El visitante no se encuentra en el sistema");
//			}else {
//		        vact.setNombre("Juan Perez");
//	        	visitantenuevo.actualizarVisitante(vact);
//			}
//	    }
//	    if (menu==6) {
//	    	//Eliminar visitante
//	    	Visitante v4=visitantenuevo.getVisitante("juan@gmail.com");
//			if(v4==null){
//				System.out.println("El visitante no se encuentra en el sistema");
//			}else {
//				visitantenuevo.eliminarVisitante(v4);
//			}
//	    }
//	    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
