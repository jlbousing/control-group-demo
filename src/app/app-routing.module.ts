import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EnterprisesComponent } from './pages/enterprises/enterprises.component';
import { ProvidersComponent } from './pages/providers/providers.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        title: "Home",
        component: HomeComponent
      },
      {
        path: "users",
        title: "Usuarios",
        component: UsersComponent
      },
      {
        path: "create-user",
        title: "Crear Usuario",
        component: CreateUserComponent
      },
      {
        path: "enterprises",
        title: "Empresas",
        component: EnterprisesComponent
      },
      {
        path: "providers",
        title: "Proveedores",
        component: ProvidersComponent
      }
    ]
  },
  {
    path: "login",
    title: "Inicio de Sesion",
    component: LoginComponent
  },
  {
    path: "**",
    title: "Pagina no encontrada",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
