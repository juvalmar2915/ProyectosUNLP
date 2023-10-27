import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisitantesComponent } from './visitantes/visitantes.component';
import { AdminsComponent } from './admins/admins.component';
import { VisitantesFormComponent } from './visitantes-form/visitantes-form.component';
import { UsuarioService } from './modelos/usuario-service';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';
import { ListaadminsComponent } from './listaadmins/listaadmins.component';
import { AdminsFormComponent } from './admins-form/admins-form.component';
import { AdminService } from './modelos/admin-service';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { UsuariopedidosComponent } from './usuariopedidos/usuariopedidos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductosComponent } from './productos/productos.component';
import { AdminsEditComponent } from './admins-edit/admins-edit.component';
import { PuntosRetiroComponent } from './puntos-retiro/puntos-retiro.component';
import { ProductoresComponent } from './productores/productores.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RondasComponent } from './rondas/rondas.component';
import { PuntoRetiroEditComponent } from './punto-retiro-edit/punto-retiro-edit.component';
import { PuntoRetiroFormComponent } from './punto-retiro-form/punto-retiro-form.component';
import { RondasFormComponent } from './rondas-form/rondas-form.component';
import { RondasEditComponent } from './rondas-edit/rondas-edit.component';
import { CategoriasFormComponent } from './categorias-form/categorias-form.component';
import { CategoriasEditComponent } from './categorias-edit/categorias-edit.component';
import { ProductoresEditComponent } from './productores-edit/productores-edit.component';
import { ProductoresFormComponent } from './productores-form/productores-form.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';
import { ProductosEditComponent } from './productos-edit/productos-edit.component';
import { AdminspedidosComponent } from './adminspedidos/adminspedidos.component';
import { VisitantesEditComponent } from './visitantes-edit/visitantes-edit.component';
import { DireccionesFormComponent } from './direcciones-form/direcciones-form.component';
import { PedidosProductorComponent } from './pedidos-productor/pedidos-productor.component';
import { ProductosProductorComponent } from './productos-productor/productos-productor.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';


 const appRoutes: Routes = [
  { path: '', component: VisitantesComponent },
  { path: 'Login', component: LoginFormComponent },
  { path: 'Registrar', component: VisitantesFormComponent },
  { path: 'Acerca', component: VisitantesComponent },
  { path: 'Catalogo', component: CatalogoComponent, canActivate: [AuthGuard] },
  { path: 'RegistrarAdmin', component: AdminsFormComponent, canActivate: [AuthGuard] },
  { path: 'Adminh', component: AdminsComponent, canActivate: [AuthGuard] },
  { path: 'ListaVisitantes', component: ListausuariosComponent, canActivate: [AuthGuard] },
  { path: 'ListaAdmins', component: ListaadminsComponent, canActivate: [AuthGuard] },
  { path: 'Carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'Pedidos', component: UsuariopedidosComponent, canActivate: [AuthGuard] },
  { path: 'Productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'editar-admin/:id', component: AdminsEditComponent, canActivate: [AuthGuard] },
  { path: 'PuntosRetiro', component: PuntosRetiroComponent, canActivate: [AuthGuard] },
  { path: 'Productores', component: ProductoresComponent, canActivate: [AuthGuard] },
  { path: 'Categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
  { path: 'Rondas', component: RondasComponent, canActivate: [AuthGuard] },
  { path: 'editar-punto-retiro/:id', component: PuntoRetiroEditComponent, canActivate: [AuthGuard] },
  { path: 'RegistrarPuntoRetiro', component: PuntoRetiroFormComponent, canActivate: [AuthGuard] },
  { path: 'RegistrarRonda', component: RondasFormComponent, canActivate: [AuthGuard] },
  { path: 'editar-ronda/:id', component: RondasEditComponent, canActivate: [AuthGuard] },
  { path: 'editar-categoria/:id', component: CategoriasEditComponent, canActivate: [AuthGuard] },
  { path: 'RegistrarCategoria', component: CategoriasFormComponent, canActivate: [AuthGuard] },
  { path: 'RegistrarProductor', component: ProductoresFormComponent, canActivate: [AuthGuard] },
  { path: 'editar-productor/:id', component: ProductoresEditComponent, canActivate: [AuthGuard] },
  { path: 'RegistrarProducto', component: ProductosFormComponent, canActivate: [AuthGuard] },
  { path: 'editar-producto/:id', component: ProductosEditComponent, canActivate: [AuthGuard] },
  { path: 'editar-producto/:id', component: ProductosEditComponent, canActivate: [AuthGuard] },
  { path: 'GestionPedidos', component: AdminspedidosComponent, canActivate: [AuthGuard] },
  { path: 'EditarPerfil', component: VisitantesEditComponent, canActivate: [AuthGuard] },
  { path: 'AgregarDireccion', component: DireccionesFormComponent, canActivate: [AuthGuard] },
  { path: 'ProductosProductor', component: ProductosProductorComponent, canActivate: [AuthGuard] },
  { path: 'PedidosProductor', component: PedidosProductorComponent, canActivate: [AuthGuard] },
 ];
 

@NgModule({
  declarations: [
    AppComponent,
    VisitantesComponent,
    AdminsComponent,
    VisitantesFormComponent,
    ListausuariosComponent,
    ListaadminsComponent,
    AdminsFormComponent,
    CatalogoComponent,
    CarritoComponent,
    UsuariopedidosComponent,
    NavbarComponent,
    FooterComponent,
    ProductosComponent,
    AdminsEditComponent,
    PuntosRetiroComponent,
    ProductoresComponent,
    CategoriasComponent,
    RondasComponent,
    PuntoRetiroEditComponent,
    PuntoRetiroFormComponent,
    RondasFormComponent,
    RondasEditComponent,
    CategoriasFormComponent,
    CategoriasEditComponent,
    ProductoresEditComponent,
    ProductoresFormComponent,
    ProductosFormComponent,
    ProductosEditComponent,
    AdminspedidosComponent,
    VisitantesEditComponent,
    DireccionesFormComponent,
    PedidosProductorComponent,
    ProductosProductorComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [UsuarioService,AdminService, CookieService,{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
