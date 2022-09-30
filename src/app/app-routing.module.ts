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
import { CreateEnterpriseComponent } from './pages/app-setting/create-enterprise/create-enterprise.component';
import { CreateProviderComponent } from './pages/app-setting/create-provider/create-provider.component';
import { RolsComponent } from './pages/app-setting/rols/rols.component';
import { CreateRolComponent } from './pages/app-setting/create-rol/create-rol.component';
import { ProviderPageComponent } from './providers/provider-page/provider-page.component';
import { CreateAssignmentsComponent } from './pages/providers/create-assignments/create-assignments.component';
import { CreateRecipeComponent } from './pages/providers/create-recipe/create-recipe.component';
import { CreateProductionComponent } from './pages/providers/create-production/create-production.component';
import { CreateDispatchComponent } from './pages/providers/create-dispatch/create-dispatch.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ChartsComponent } from './pages/reports/charts/charts.component';
import { ItemsComponent } from './pages/providers/items/items.component';
import { CreateItemComponent } from './pages/providers/create-item/create-item.component';
import { PlacesComponent } from './pages/places/places.component';
import { StatesComponent } from './pages/places/states/states.component';
import { MunicipalityComponent } from './pages/places/municipality/municipality.component';
import { ParishComponent } from './pages/places/parish/parish.component';
import { CreateStateComponent } from './pages/places/create-state/create-state.component';
import { CreateMunicipalityComponent } from './pages/places/create-municipality/create-municipality.component';
import { CreateParishComponent } from './pages/places/create-parish/create-parish.component';
import { AssignamentsReportComponent } from './pages/reports/assignaments-report/assignaments-report.component';
import { CreateSubcategoryComponent } from './pages/providers/create-subcategory/create-subcategory.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProductionReportComponent } from './pages/reports/production-report/production-report.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        title: "Bienvenido Usuario",
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
        path: "providers/supplier/:rif",
        title: "Proveedores",
        component: ProviderPageComponent
      }
    ]
  },
  {
    path: 'providers',
    component: ProvidersComponent,
    children: [
      {
        path: "categories/:supplierId",
        title: "Categorias",
        component: CategoriesComponent
      },
      {
        path: "assignments/:supplierId",
        title: "Asignaciones",
        component: AssignmentsComponent
      },
      {
        path: "instructions/:supplierId",
        title: "Instrucciones",
        component: InstructionsComponent
      },
      {
        path: "production/:supplierId",
        title: "Produccion",
        component: ProductionComponent
      },
      {
        path: "dispatch/:supplierId",
        title: "Despacho",
        component: DispatchComponent
      },
      {
        path: "settings/:supplierId",
        title: "Configuracion",
        component: SettingsComponent
      },
      {
        path: "create-assigment",
        title: "Nueva asignacion",
        component: CreateAssignmentsComponent
      },
      {
        path: "create-recipe/:supplierId",
        title: "Nueva Receta",
        component: CreateRecipeComponent
      },
      {
        path: "create-production/:supplierId",
        title: "Nueva Produccion",
        component: CreateProductionComponent
      },
      {
        path: "create-dispatch/:supplierId/production/:productionId",
        title: "Nuevo Despacho",
        component: CreateDispatchComponent
      },
      {
        path: "items/:supplierId",
        title: "Productos",
        component: ItemsComponent
      },
      {
        path: "create-item/:supplierId",
        title: "Nuevo producto",
        component: CreateItemComponent
      },
      {
        path: "create-subcategory/:supplierId",
        title: "Nueva subcategoria",
        component: CreateSubcategoryComponent
      }
    ]
  },
  {
    path: 'settings',
    component: AppSettingComponent,
    children: [
      {
        path: "categories",
        title: "Categorias",
        component: SettingsCategoriesComponent
      },
      {
        path: "create-category",
        title: "Nueva categoria",
        component: CreateCategoryComponent
      },
      {
        path: "create-enterprise",
        title: "Nueva empresa",
        component: CreateEnterpriseComponent
      },
      {
        path: "create-provider",
        title: "Nuevo proveedor",
        component: CreateProviderComponent
      },
      {
        path: "rols",
        title: "Roles",
        component: RolsComponent
      },
      {
        path: "create-rol",
        title: "Nuevo rol",
        component: CreateRolComponent
      }
    ]
  },
  {
    path: "places",
    component: PlacesComponent,
    children: [
      {
        path: "state",
        title: "Estados",
        component: StatesComponent
      },
      {
        path: "municipality",
        title: "Municipios",
        component: MunicipalityComponent
      },
      {
        path: "parish",
        title: "Parroquias",
        component: ParishComponent
      },
      {
        path: "create-state",
        title: "Nuevo estado",
        component: CreateStateComponent
      },
      {
        path: "create-municipality",
        title: "Nuevo municipio",
        component: CreateMunicipalityComponent
      },
      {
        path: "create-parish",
        title: "Nueva parroquia",
        component: CreateParishComponent
      }
    ]
  },
  {
    path: "reports",
    component: ReportsComponent,
    children: [
      {
        path: "assignaments",
        title: "Reportes Asignaciones",
        component: AssignamentsReportComponent
      },
      {
        path: "production",
        title: "Reportes Produccion",
        component: ProductionReportComponent
      }
    ]
  },
  {
    path: "login",
    title: "Inicio de Sesion",
    component: LoginComponent
  },
  {
    path: "recovery",
    title: "Recuperar contraseña",
    component: RecoveryComponent
  },
  {
    path: "**",
    title: "Pagina no encontrada",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: "reload"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
