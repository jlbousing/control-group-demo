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
import { CreateSubCategoryComponent } from './pages/providers/create-subcategory/create-subcategory.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProductionReportComponent } from './pages/reports/production-report/production-report.component';
import { DispatchReportComponent } from './pages/reports/dispatch-report/dispatch-report.component';
import { AccessGuard } from './guards/access/access.guard';
import { LoginAccessGuard } from './guards/login-access/login-access.guard';
import { TemplatesComponent } from './pages/providers/templates/templates.component';
import { CreateTemplateComponent } from './pages/providers/create-template/create-template.component';
import { CompanyReportComponent } from './pages/reports/company-report/company-report.component';
import { ProviderReportComponent } from './pages/reports/provider-report/provider-report.component';
import { ResetComponent } from './pages/reset/reset.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        title: "Bienvenido",
        canActivate: [LoginAccessGuard],
        component: HomeComponent
      },
      {
        path: "users",
        title: "Usuarios",
        canActivate: [LoginAccessGuard],
        component: UsersComponent
      },
      {
        path: "create-user",
        title: "Crear Usuario",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateUserComponent
      },
      {
        path: "enterprises",
        title: "Empresas",
        canActivate: [LoginAccessGuard],
        component: EnterprisesComponent
      },
      {
        path: "providers/supplier/:rif",
        title: "Proveedores",
        canActivate: [LoginAccessGuard],
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
        canActivate: [LoginAccessGuard],
        component: CategoriesComponent
      },
      {
        path: "assignments/:supplierId",
        title: "Asignaciones",
        canActivate: [LoginAccessGuard],
        component: AssignmentsComponent
      },
      {
        path: "instructions/:supplierId",
        title: "Recetas",
        canActivate: [LoginAccessGuard],
        component: InstructionsComponent
      },
      {
        path: "production/:supplierId",
        title: "Produccion",
        canActivate: [LoginAccessGuard],
        component: ProductionComponent
      },
      {
        path: "dispatch/:supplierId",
        title: "Despacho",
        canActivate: [LoginAccessGuard],
        component: DispatchComponent
      },
      {
        path: "settings/:supplierId",
        title: "Configuracion",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: SettingsComponent
      },
      {
        path: "create-assigment",
        title: "Nueva Asignacion",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateAssignmentsComponent
      },
      {
        path: "create-recipe/:supplierId",
        title: "Nueva Receta",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateRecipeComponent
      },
      {
        path: "create-production/:supplierId",
        title: "Nueva Produccion",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateProductionComponent
      },
      {
        path: "create-dispatch/:supplierId/production/:productionId",
        title: "Nuevo Despacho",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateDispatchComponent
      },
      {
        path: "items/:supplierId",
        title: "Productos",
        canActivate: [LoginAccessGuard],
        component: ItemsComponent
      },
      {
        path: "create-item/:supplierId",
        title: "Nuevo Producto",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateItemComponent
      },
      {
        path: "create-subcategory/:supplierId",
        title: "Nueva Subcategoria",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateSubCategoryComponent
      },
      {
        path: "templates/:supplierId",
        title: "Plantillas",
        canActivate: [LoginAccessGuard],
        component: TemplatesComponent
      },
      {
        path: "create-template/:supplierId",
        title: "Nueva Plantilla",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateTemplateComponent
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
        canActivate: [LoginAccessGuard],
        component: SettingsCategoriesComponent
      },
      {
        path: "create-category",
        title: "Nueva Categoria",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateCategoryComponent
      },
      {
        path: "create-enterprise",
        title: "Nueva Empresa",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateEnterpriseComponent
      },
      {
        path: "create-provider",
        title: "Nuevo Proveedor",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateProviderComponent
      },
      {
        path: "rols",
        title: "Roles",
        canActivate: [LoginAccessGuard],
        component: RolsComponent
      },
      {
        path: "create-rol",
        title: "Nuevo Rol",
        canActivate: [LoginAccessGuard,AccessGuard],
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
        canActivate: [LoginAccessGuard],
        component: StatesComponent
      },
      {
        path: "municipality",
        title: "Municipios",
        canActivate: [LoginAccessGuard],
        component: MunicipalityComponent
      },
      {
        path: "parish",
        title: "Parroquias",
        canActivate: [LoginAccessGuard],
        component: ParishComponent
      },
      {
        path: "create-state",
        title: "Nuevo Estado",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateStateComponent
      },
      {
        path: "create-municipality",
        title: "Nuevo Municipio",
        canActivate: [LoginAccessGuard,AccessGuard],
        component: CreateMunicipalityComponent
      },
      {
        path: "create-parish",
        title: "Nueva Parroquia",
        canActivate: [LoginAccessGuard,AccessGuard],
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
        canActivate: [LoginAccessGuard],
        component: AssignamentsReportComponent
      },
      {
        path: "production",
        title: "Reportes Produccion",
        canActivate: [LoginAccessGuard],
        component: ProductionReportComponent
      },
      {
        path: "dispatch",
        title: "Reportes Despacho",
        canActivate: [LoginAccessGuard],
        component: DispatchReportComponent
      },
      {
        path: "companies",
        title: "Reportes Empresas",
        canActivate: [LoginAccessGuard],
        component: CompanyReportComponent
      },
      {
        path: "providers",
        title: "Reportes Proveedores",
        canActivate: [LoginAccessGuard],
        component: ProviderReportComponent
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
    title: "Recuperar Contraseña",
    component: RecoveryComponent
  },
  {
    path: "reset/:token",
    component: ResetComponent
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
