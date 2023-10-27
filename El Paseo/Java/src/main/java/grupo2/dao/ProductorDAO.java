package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Productor;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class ProductorDAO implements IProductorDAO {
	@Inject
	EMProvider e;
	public List<Productor> getProductores() {
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT p FROM Productor p");
        List<Productor> l=query.getResultList();
        return l;
	}

	public Productor getProductor(Long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Productor p where(p.id= :id)");
		q.setParameter("id", id);
		Productor d=(Productor)q.getSingleResult();
        return d;
	}

	public void agregarProductor(Productor p) {
		EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(p);
        tx.commit();
		
	}

	public void actualizarProductor(Productor p){
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(p);

        tx.commit();
		
	}

	public void eliminarProductor(Productor p) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		p.setBorrado(true);
	    em.merge(p); 
	    tx.commit();
		
	}
}
