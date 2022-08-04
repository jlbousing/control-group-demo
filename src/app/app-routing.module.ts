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
import { CategoriesComponent } from './pages/providers/categories/categories.component';
import { AssignmentsComponent } from './pages/providers/assignments/assignments.component';
import { InstructionsComponent } from './pages/providers/instructions/instructions.component';
import { ProductionComponent } from './pages/providers/production/production.component';
import { DispatchComponent } from './pages/providers/dispatch/dispatch.component';
import { SettingsComponent } from './pages/providers/settings/settings.component';
import { AppSettingComponent } from './pages/app-setting/app-setting.component';
import { SettingsCategoriesComponent } from './pages/app-setting/settings-categories/settings-categories.component';
import { CreateCategoryComponent } from './pages/app-setting/create-category/create-category.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        title: "Inicio",
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
      }
    ]
  },
  {
    path: 'providers',
    component: ProvidersComponent,
    children: [
      {
        path: "categories",
        title: "categorias",
        component: CategoriesComponent
      },
      {
        path: "assignments",
        title: "Asignaciones",
        component: AssignmentsComponent
      },
      {
        path: "instructions",
        title: "Instrucciones",
        component: InstructionsComponent
      },
      {
        path: "production",
        title: "Produccion",
        component: ProductionComponent
      },
      {
        path: "dispatch",
        title: "Despacho",
        component: DispatchComponent
      },
      {
        path: "settings",
        title: "Configuracion",
        component: SettingsComponent
      }
    ]
  },
  {
    path: 'settings',
    component: AppSettingComponent,
    children: [
      {
        path: 'categories',
        title: 'Categorias',
        component: SettingsCategoriesComponent
      },
      {
        path: 'create-category',
        title: 'Nueva categoria',
        component: CreateCategoryComponent
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
