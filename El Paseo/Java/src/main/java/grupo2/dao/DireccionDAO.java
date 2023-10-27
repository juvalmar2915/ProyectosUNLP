package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Direccion;
import grupo2.model.Visitante;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class DireccionDAO implements IDireccionDAO {
	@Inject
	EMProvider e;
	public List<Direccion> getDirecciones() {
		EntityManager em= e.getEntityManager(); 
    	TypedQuery<Direccion> query = (TypedQuery<Direccion>) em.createQuery("SELECT d FROM Direccion d");
        List<Direccion> l=query.getResultList();
        return l;
	}
	public List<Direccion> getDireccionesdeunVisitante(Visitante v) {
		EntityManager em= e.getEntityManager(); 
    	TypedQuery<Direccion> query = (TypedQuery<Direccion>) em.createQuery("SELECT d FROM Direccion d where(d.v= :v)");
    	query.setParameter("v", v);
    	List<Direccion> l=query.getResultList();
        return l;
	}

	public Direccion getDireccion(Long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT d FROM Direccion d where(d.id= :id)");
		q.setParameter("id", id);
		Direccion d=(Direccion)q.getSingleResult();
        return d;
	}

	public void agregarDireccion(Direccion direccion) {
		EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(direccion);
        tx.commit();
		
	}

	public void actualizarDireccion(Direccion direccion) {
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(direccion);
        tx.commit();
		
	}

	public void eliminarDireccion(Direccion direccion) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		direccion.setBorrado(true);
	    em.merge(direccion);
	    tx.commit();
		
	}
}
