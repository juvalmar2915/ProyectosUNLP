package grupo2.dao;
import javax.persistence.*;
public class EntityManagerSingleton {
	private static EntityManagerFactory emf;

	private EntityManagerSingleton() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized EntityManager getEntityManager() {
		if (emf == null) {
			// Crear el EntityManagerFactory una sola vez
			emf = Persistence.createEntityManagerFactory("miUP");
			
		}
		// Crear el EntityManager a partir del EntityManagerFactory
		return emf.createEntityManager();
	}
	
	public static synchronized void CloseEntityManager() {
		if (emf != null) {
			emf.close();
			emf = null;
		}
	}

}
