package grupo2.resources;
import javax.persistence.EntityManager;

import org.jvnet.hk2.annotations.Contract;



@Contract
public interface IEMProvider {
	public void closeEntityManager();
	public EntityManager getEntityManager();
	
}