package grupo2.dao;
import java.util.List;

import java.util.*;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Visitante;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class VisitanteDAO implements IVisitanteDAO{
	@Inject
	EMProvider e;
    public void agregarVisitante(Visitante visitante) {
    	Visitante aux=getVisitante(visitante.getEmail());
    	EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
    	if (aux==null) {
	        em.persist(visitante);
	        
    	}
    	else {
    		aux.setBorrado(false);
    		em.merge(aux);
    	}
    	tx.commit();
    }
    public Visitante getVisitante(long id) {
    	EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT v FROM Visitante v where(v.id= :id)");
		q.setParameter("id", id);
		Visitante v=null;
		try {
			v=(Visitante)q.getSingleResult();
		}
        catch (NoResultException nre) {
        	v=null;
		}
		return v;
    }
    
    public Visitante getVisitante(String email) {
    	EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT v FROM Visitante v where(v.email= :email)");
		q.setParameter("email", email);
		Visitante v=null;
		try {
			v=(Visitante)q.getSingleResult();
		}
        catch (NoResultException nre) {
        	v=null;
		}
		return v;
    }

    public List<Visitante> getVisitantes() {
    	EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT v FROM Visitante v");
        List<Visitante> l=query.getResultList();
        return l;
    }
    
    public void actualizarVisitante(Visitante visitante) {
    	EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(visitante);
        tx.commit();
	};
	
	public void eliminarVisitante(Visitante visitante) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		visitante.setBorrado(true);
        em.merge(visitante);
	    tx.commit();
	};

}