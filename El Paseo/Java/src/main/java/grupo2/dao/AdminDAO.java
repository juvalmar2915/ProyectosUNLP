package grupo2.dao;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Admin;
import grupo2.model.Visitante;
import grupo2.resources.*;
import jakarta.inject.Inject;

@Service
public class AdminDAO implements IAdminDAO {
	
	@Inject
	EMProvider e;
	public List<Admin> getAdmins() {
    	//EntityManager em = EntityManagerSingleton.getEntityManager();
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT a FROM Admin a");
        List<Admin> l=query.getResultList();
        //EntityManagerSingleton.CloseEntityManager();
        return l;
	}

	public Admin getAdmin(String email) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT a FROM Admin a where(a.email= :email)");
		q.setParameter("email", email);
		Admin a;
		try {
			a=(Admin)q.getSingleResult();
		}
        catch (NoResultException nre) {
        	a=null;
		}
        return a;
	}
	
	public Admin getAdmin(long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT a FROM Admin a where(a.id= :id)");
		q.setParameter("id", id);
		Admin a=null;
		try {
			a=(Admin)q.getSingleResult();
		}
        catch (NoResultException nre) {
        	a=null;
		}
		return a;
    }

	public void agregarAdmin(Admin admin) {
		Admin aux=getAdmin(admin.getEmail());
		EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
    	if (aux==null) {
	        em.persist(admin);
	        
    	}
    	else {
    		aux.setBorrado(false);
    		em.merge(aux);
    	}
    	tx.commit();
		
	}

	public void actualizarAdmin(Admin admin) {
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(admin);
        tx.commit();
		
	}

	public void eliminarAdmin(Admin admin) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		admin.setBorrado(true);
	    em.merge(admin); 
	    tx.commit();
		
	}

}
