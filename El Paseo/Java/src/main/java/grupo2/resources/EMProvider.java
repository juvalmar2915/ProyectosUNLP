package grupo2.resources;

import javax.annotation.PreDestroy;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;


@Service
public class EMProvider implements IEMProvider{
	
	EntityManagerFactory emf;

    public EMProvider() {
    	
    }

    public EntityManager getEntityManager() {
    	emf = Persistence.createEntityManagerFactory("miUP");
		return emf.createEntityManager();
    }
    @PreDestroy
    public void closeEntityManager() {
			emf.close();
    }
}