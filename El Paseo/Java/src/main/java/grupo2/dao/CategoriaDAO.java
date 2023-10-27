package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Categoria;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;

@Service
public class CategoriaDAO implements ICategoriaDAO {
	@Inject
	EMProvider e;
	public List<Categoria> getCategorias() {
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT c FROM Categoria c");
        List<Categoria> l=query.getResultList();
        return l;
	}

	public Categoria getCategoria(Long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT c FROM Categoria c where(c.id= :id)");
		q.setParameter("id", id);
		Categoria c=(Categoria)q.getSingleResult();
        return c;
	}

	public void agregarCategoria(Categoria c) {
		EntityManager em= e.getEntityManager(); 
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(c);
        tx.commit();
		
	}

	public void actualizarCategoria(Categoria c){
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(c);
        tx.commit();
	}

	public void eliminarCategoria(Categoria c) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		c.setBorrado(true);
	    em.merge(c); 
	    tx.commit();
	}

}
