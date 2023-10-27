package grupo2.dao;

import java.util.List;

import org.jvnet.hk2.annotations.Contract;

import grupo2.model.Admin;

@Contract
public interface IAdminDAO {
	public List<Admin> getAdmins();
	public Admin getAdmin(String mail);
	public Admin getAdmin(long id);
	public void agregarAdmin(Admin admin);
	public void actualizarAdmin(Admin admin);
	public void eliminarAdmin(Admin admin);
}
