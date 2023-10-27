package grupo2.resources;

import org.glassfish.hk2.api.JustInTimeInjectionResolver;
import org.glassfish.hk2.utilities.binding.AbstractBinder;

public class MyApplicationCustomizer extends AbstractBinder{
    	@Override
	    protected void configure() {
//    		bind(EMProvider.class).to(IEMProvider.class).in(RequestScoped.class);
//	    	bind(AdminDAO.class).to(IAdminDAO.class).in(RequestScoped.class);
			bind( JustInTimeServiceResolver.class ).to( JustInTimeInjectionResolver.class );
	    	
	    }	
}