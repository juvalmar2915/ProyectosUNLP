package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Punto_Retiro;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class Punto_RetiroDAO implements IPunto_RetiroDAO {
	@Inject
	EMProvider e;
	public List<Punto_Retiro> getPuntosdeRetiro() {
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT p FROM Punto_Retiro p");
        List<Punto_Retiro> l=query.getResultList();
        return l;
	}

	public Punto_Retiro getPuntoRetiro(Long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Punto_Retiro p where(p.id= :id)");
		q.setParameter("id", id);
		Punto_Retiro d=(Punto_Retiro)q.getSingleResult();
        return d;
	}

	public void agregarPuntoRetiro(Punto_Retiro p) {
		EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(p);
        tx.commit();
		
	}

	public void actualizarPuntoRetiro(Punto_Retiro p){
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(p);
        tx.commit();
		
	}

	public void eliminarPuntoRetiro(Punto_Retiro p) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		p.setBorrado(true);
	    em.merge(p); 
	    tx.commit();
		
	}

}
