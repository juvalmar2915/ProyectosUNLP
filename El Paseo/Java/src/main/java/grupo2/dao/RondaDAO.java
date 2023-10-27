package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Ronda;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class RondaDAO implements IRondaDAO {
	@Inject
	EMProvider e;
	public List<Ronda> getRondas() {
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT r FROM Ronda r");
        List<Ronda> l=query.getResultList();
        return l;
	}

	public Ronda getRonda(Long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT r FROM Ronda r where(r.id= :id)");
		q.setParameter("id", id);
		Ronda d=(Ronda)q.getSingleResult();
        return d;
	}

	public void agregarRonda(Ronda r) {
		EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(r);
        tx.commit();
		
	}

	public void actualizarRonda(Ronda r){
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(r);
        tx.commit();
		
	}

	public void eliminarRonda(Ronda r) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		r.setBorrado(true);
	    em.merge(r); 
	    tx.commit();
		
	}


}
