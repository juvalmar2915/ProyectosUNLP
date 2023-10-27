package grupo2.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;

import org.jvnet.hk2.annotations.Service;

import grupo2.model.Pedido;
import grupo2.resources.EMProvider;
import jakarta.inject.Inject;
@Service
public class PedidoDAO implements IPedidoDAO {
	@Inject
	EMProvider e;
	public List<Pedido> getPedidos() {
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT p FROM Pedido p");
        List<Pedido> l=query.getResultList();
        return l;
	}
	public List<Pedido> getPedidosbyusuario(Long id) {
		EntityManager em= e.getEntityManager(); 
        javax.persistence.Query query = em.createQuery("SELECT p FROM Pedido p where (p.visitante.id = :id)");
        query.setParameter("id", id);
        List<Pedido> l;
        try {
    		l=query.getResultList();
    	}
        catch (NoResultException nre) {
          	l=null;
        }
        return l;
	}

	public Pedido getPedido(Long id) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Pedido p where(p.id= :id)");
		q.setParameter("id", id);
		Pedido p;
		try {
		p=(Pedido)q.getSingleResult();
		}
        catch (NoResultException nre) {
        	p=null;
		}
        return p;
	}
    
	public Pedido getPedido(Long id, Long nroronda) {
		EntityManager em= e.getEntityManager(); 
    	javax.persistence.Query q = em.createQuery("SELECT p FROM Pedido p where ((p.visitante.id = :id) AND (p.ronda.nroRonda = :nroronda))");
		q.setParameter("id", id);
		q.setParameter("nroronda", nroronda);
		Pedido p;
		try {
			p=(Pedido)q.getSingleResult();
		}
	    catch (NoResultException nre) {
	       	p=null;
	    }
        return p;
	}
	public void agregarPedido(Pedido p) {
		EntityManager em= e.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.persist(p);
        tx.commit();
		
	}

	public void actualizarPedido(Pedido p){
		EntityManager em= e.getEntityManager(); 
    	EntityTransaction tx = em.getTransaction();
        tx.begin();
        em.merge(p);
        tx.commit();
		
	}

	public void eliminarPedido(Pedido p) {
		EntityManager em= e.getEntityManager(); 
		EntityTransaction tx = em.getTransaction();
		tx.begin();
		p.setBorrado(true);
	    em.merge(p); 
	    tx.commit();
		
	}

}
