package grupo2.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name="ADMIN_ID", referencedColumnName="ID")
public class Admin extends Persona {
	public Admin() {
		
	}
	
}
