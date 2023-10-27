package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Admin;
import grupo2.model.Categoria;
import grupo2.model.Producto;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class ProductoDAO implements IProductoDAO {
	@Inject
	EMProvider e;
	public List<Producto> getProductos() {
		EntityManager em = e.getEntityManager();
        javax.persistence.Query query = em.createQuery("SELECT p FROM Producto p");
        List<Producto> l=query.getResultList();
        return l;
	}

	public List<Producto> getProductosbycategoria(Long id) {
		EntityManager em = e.getEntityManager();
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Producto p where(p.categoria.id= :id)");
		q.setParameter("id", id);
		List<Producto> l;
		try {
    		l=q.getResultList();
    	}
        catch (NoResultException nre) {
          	l=null;
        }
        return l;
	}
	
	public List<Producto> getProductosbyproductor(Long id) {
		EntityManager em = e.getEntityManager();
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Producto p where(p.productor.id= :id)");
		q.setParameter("id", id);
		List<Producto> l;
		try {
    		l=q.getResultList();
    	}
        catch (NoResultException nre) {
          	l=null;
        }
        return l;
	}
	
	public Producto getProducto(Long id) {
		EntityManager em = e.getEntityManager();
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Producto p where(p.id= :id)");
		q.setParameter("id", id);
		Producto d;
		try {
			d=(Producto)q.getSingleResult();
		}
        catch (NoResultException nre) {
        	d=null;
		}
        return d;
	}
	
	public void agregarProducto(Producto p) {
		EntityManager em = e.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(p);
        tx.commit();
	}

	public void actualizarProducto(Producto p){
		EntityManager em = e.getEntityManager();
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(p);

        tx.commit();
		
	}

	public void eliminarProducto(Producto p) {
		EntityManager em = e.getEntityManager();
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		p.setBorrado(true);
	    em.merge(p);
	    tx.commit();
		
	}


}
