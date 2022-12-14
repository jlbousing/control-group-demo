import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './pages/users/users.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';
import { CustomButtonComponent } from './components/button/button.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';
import { EnterprisesComponent } from './pages/enterprises/enterprises.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { CategoriesTableComponent } from './components/providers/categories-table/categories-table.component';
import { CategoriesComponent } from './pages/providers/categories/categories.component';
import { EditCategoriesModalComponent } from './components/modals/edit-categories-modal/edit-categories-modal.component';
import { SubmenuProvidersComponent } from './components/providers/submenu-providers/submenu-providers.component';
import { AssignmentsComponent } from './pages/providers/assignments/assignments.component';
import { AssignmentsTableComponent } from './components/providers/assignments-table/assignments-table.component';
import { EditAssignmentsModalComponent } from './components/modals/edit-assignments-modal/edit-assignments-modal.component';
import { InstructionsComponent } from './pages/providers/instructions/instructions.component';
import { InstructionsTableComponent } from './components/providers/instructions-table/instructions-table.component';
import { EditInstructionsModalComponent } from './components/modals/edit-instructions-modal/edit-instructions-modal.component';
import { ProductionComponent } from './pages/providers/production/production.component';
import { ProductionTableComponent } from './components/providers/production-table/production-table.component';
import { ViewProductionModalComponent } from './components/modals/view-production-modal/view-production-modal.component';
import { DispatchComponent } from './pages/providers/dispatch/dispatch.component';
import { DispatchTableComponent } from './components/providers/dispatch-table/dispatch-table.component';
import { EditDispatchModalComponent } from './components/modals/edit-dispatch-modal/edit-dispatch-modal.component';
import { ViewDispatchModalComponent } from './components/modals/view-dispatch-modal/view-dispatch-modal.component';
import { SettingsComponent } from './pages/providers/settings/settings.component';
import { TitleServicesService } from './services/title/title-services.service';
import { HomeCardsComponent } from './components/home/home-cards/home-cards.component';
import { SidebarUserInfoComponent } from './components/sidebar-user-info/sidebar-user-info.component';
import { AppSettingComponent } from './pages/app-setting/app-setting.component';
import { SubmenuSettingsComponent } from './components/settings/submenu-settings/submenu-settings.component';
import { SettingsCategoriesComponent } from './pages/app-setting/settings-categories/settings-categories.component';
import { CreateEnterpriseComponent } from './pages/app-setting/create-enterprise/create-enterprise.component';
import { CreateProviderComponent } from './pages/app-setting/create-provider/create-provider.component';
import { RolsComponent } from './pages/app-setting/rols/rols.component';
import { SettingsCategoriesTableComponent } from './components/settings/settings-categories-table/settings-categories-table.component';
import { SeparatorTitleComponent } from './components/separator-title/separator-title.component';
import { CreateCategoryComponent } from './pages/app-setting/create-category/create-category.component';
import { SettingsRolTableComponent } from './components/settings/settings-rol-table/settings-rol-table.component';
import { CreateRolComponent } from './pages/app-setting/create-rol/create-rol.component';

import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { Dialog } from '@angular/cdk/dialog';
import { DIALOG_SCROLL_STRATEGY_PROVIDER } from '@angular/cdk/dialog';
import { DinamicTitleIconComponent } from './components/dinamic-title-icon/dinamic-title-icon.component';
import { SubmenuUsersComponent } from './components/users/submenu-users/submenu-users.component';
import { EnterpriseCardComponent } from './components/enterprises/enterprise-card/enterprise-card.component';
import { ProviderPageComponent } from './providers/provider-page/provider-page.component';
import { ProviderCardComponent } from './components/providers/provider-card/provider-card.component';

//import { UsersService } from './services/users/users.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUsersModalComponent } from './components/modals/edit-users-modal/edit-users-modal.component';
import { CreateAssignmentsComponent } from './pages/providers/create-assignments/create-assignments.component';
import { SubcategorySelectComponent } from './components/subcategory-select/subcategory-select.component';
import { ViewAssignmentsModalComponent } from './components/modals/view-assignments-modal/view-assignments-modal.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { CreateRecipeComponent } from './pages/providers/create-recipe/create-recipe.component';
import { CreateProductionComponent } from './pages/providers/create-production/create-production.component';
import { CreateDispatchComponent } from './pages/providers/create-dispatch/create-dispatch.component';
import { RemakeProductionModalComponent } from './components/modals/remake-production-modal/remake-production-modal.component';
import { ReturnDispatchModalComponent } from './components/modals/return-dispatch-modal/return-dispatch-modal.component';
import { LoadingComponent } from './components/spinner/loading/loading.component';
import { SearchEnterpriseComponent } from './components/enterprises/search-enterprise/search-enterprise.component';

import { NgChartsModule } from 'ng2-charts';
import { ReportsComponent } from './pages/reports/reports.component';
import { DataControllersComponent } from './components/reports/data-controllers/data-controllers.component';
import { ChartsComponent } from './pages/reports/charts/charts.component';
import { ItemsComponent } from './pages/providers/items/items.component';
import { CreateItemComponent } from './pages/providers/create-item/create-item.component';
import { ItemsTableComponent } from './components/providers/items-table/items-table.component';
import { EditItemModalComponent } from './components/modals/edit-item-modal/edit-item-modal.component';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { SubmenuPlacesComponent } from './components/places/submenu-places/submenu-places.component';
import { PlacesComponent } from './pages/places/places.component';
import { StatesComponent } from './pages/places/states/states.component';
import { MunicipalityComponent } from './pages/places/municipality/municipality.component';
import { ParishComponent } from './pages/places/parish/parish.component';
import { StateTableComponent } from './components/places/state-table/state-table.component';
import { ViewStateModalComponent } from './components/modals/view-state-modal/view-state-modal.component';
import { CreateStateComponent } from './pages/places/create-state/create-state.component';
import { CreateMunicipalityComponent } from './pages/places/create-municipality/create-municipality.component';
import { CreateParishComponent } from './pages/places/create-parish/create-parish.component';
import { EditStateModalComponent } from './components/modals/edit-state-modal/edit-state-modal.component';
import { MunicipalitieTableComponent } from './components/places/municipalitie-table/municipalitie-table.component';
import { ParishTableComponent } from './components/places/parish-table/parish-table.component';
import { ViewMunicipalityModalComponent } from './components/modals/view-municipality-modal/view-municipality-modal.component';
import { EditMunicipalityModalComponent } from './components/modals/edit-municipality-modal/edit-municipality-modal.component';
import { ViewParishModalComponent } from './components/modals/view-parish-modal/view-parish-modal.component';
import { EditParishModalComponent } from './components/modals/edit-parish-modal/edit-parish-modal.component';
import { EditSettingsCategoryModalComponent } from './components/modals/edit-settings-category-modal/edit-settings-category-modal.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { AssignamentsReportComponent } from './pages/reports/assignaments-report/assignaments-report.component';
import { ProductionReportComponent } from './pages/reports/production-report/production-report.component';
import { DispatchReportComponent } from './pages/reports/dispatch-report/dispatch-report.component';
import { BartchartAssignamentsComponent } from './components/reports/bartchart-assignaments/bartchart-assignaments.component';
import { PiechartAssignamentsComponent } from './components/reports/piechart-assignaments/piechart-assignaments.component';
import { CreateSubCategoryComponent } from './pages/providers/create-subcategory/create-subcategory.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor/auth-interceptor.service';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ViewRecipeModalComponent } from './components/modals/view-recipe-modal/view-recipe-modal.component';
import { focusInvalidInputDirective } from './directives/focus-invalid-input.directive';
import { TemplatesComponent } from './pages/providers/templates/templates.component';
import { CreateTemplateComponent } from './pages/providers/create-template/create-template.component';
import { TemplateTableComponent } from './components/providers/template-table/template-table.component';
import { ViewTemplateModalComponent } from './components/modals/view-template-modal/view-template-modal.component';
import { CompanyReportComponent } from './pages/reports/company-report/company-report.component';
import { ProviderReportComponent } from './pages/reports/provider-report/provider-report.component';
import { DataControllerCompanyComponent } from './components/reports/data-controller-company/data-controller-company.component';
import { EditTemplateModalComponent } from './components/modals/edit-template-modal/edit-template-modal.component';
import { ResetComponent } from './pages/reset/reset.component';
import { AssignamentDatepickersComponent } from './components/assignament-datepickers/assignament-datepickers.component';
import { EnterpriseAssignamentsComponent } from './pages/enterprise-assignaments/enterprise-assignaments.component';
import { EnterpriseAssignamentCardComponent } from './components/enterprises/enterprise-assignament-card/enterprise-assignament-card.component';
import { SubmenuAssignamentsComponent } from './components/assignaments/submenu-assignaments/submenu-assignaments.component';
import { RubrosComponent } from './pages/app-setting/rubros/rubros.component';
import { CreateRubroComponent } from './pages/app-setting/create-rubro/create-rubro.component';
import { RubrosTableComponent } from './components/settings/rubros-table/rubros-table.component';
import { EditRubroModalComponent } from './components/modals/edit-rubro-modal/edit-rubro-modal.component';
import { BackLinkComponent } from './components/back-link/back-link.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    LoginFormComponent,
    LayoutComponent,
    HomeComponent,
    SidebarComponent,
    UsersComponent,
    TopbarComponent,
    UsersTableComponent,
    CustomButtonComponent,
    CreateUserComponent,
    UsersFormComponent,
    EnterprisesComponent,
    ProvidersComponent,
    CategoriesTableComponent,
    CategoriesComponent,
    EditCategoriesModalComponent,
    SubmenuProvidersComponent,
    AssignmentsComponent,
    AssignmentsTableComponent,
    EditAssignmentsModalComponent,
    InstructionsComponent,
    InstructionsTableComponent,
    EditInstructionsModalComponent,
    ProductionComponent,
    ProductionTableComponent,
    ViewProductionModalComponent,
    DispatchComponent,
    DispatchTableComponent,
    EditDispatchModalComponent,
    ViewDispatchModalComponent,
    SettingsComponent,
    HomeCardsComponent,
    SidebarUserInfoComponent,
    AppSettingComponent,
    SubmenuSettingsComponent,
    SettingsCategoriesComponent,
    CreateEnterpriseComponent,
    CreateProviderComponent,
    RolsComponent,
    SettingsCategoriesTableComponent,
    SeparatorTitleComponent,
    CreateCategoryComponent,
    SettingsRolTableComponent,
    CreateRolComponent,
    DinamicTitleIconComponent,
    SubmenuUsersComponent,
    EnterpriseCardComponent,
    ProviderPageComponent,
    ProviderCardComponent,
    EditUsersModalComponent,
    CreateAssignmentsComponent,
    SubcategorySelectComponent,
    ViewAssignmentsModalComponent,
    SearchInputComponent,
    CreateRecipeComponent,
    CreateProductionComponent,
    CreateDispatchComponent,
    RemakeProductionModalComponent,
    ReturnDispatchModalComponent,
    LoadingComponent,
    SearchEnterpriseComponent,
    ReportsComponent,
    DataControllersComponent,
    ChartsComponent,
    ItemsComponent,
    CreateItemComponent,
    ItemsTableComponent,
    EditItemModalComponent,
    AlertModalComponent,
    SubmenuPlacesComponent,
    PlacesComponent,
    StatesComponent,
    MunicipalityComponent,
    ParishComponent,
    StateTableComponent,
    ViewStateModalComponent,
    CreateStateComponent,
    CreateMunicipalityComponent,
    CreateParishComponent,
    EditStateModalComponent,
    MunicipalitieTableComponent,
    ParishTableComponent,
    ViewMunicipalityModalComponent,
    EditMunicipalityModalComponent,
    ViewParishModalComponent,
    EditParishModalComponent,
    EditSettingsCategoryModalComponent,
    LoadMoreComponent,
    AssignamentsReportComponent,
    ProductionReportComponent,
    DispatchReportComponent,
    BartchartAssignamentsComponent,
    PiechartAssignamentsComponent,
    CreateSubCategoryComponent,
    RecoveryComponent,
    ViewRecipeModalComponent,
    focusInvalidInputDirective,
    TemplatesComponent,
    CreateTemplateComponent,
    TemplateTableComponent,
    ViewTemplateModalComponent,
    CompanyReportComponent,
    ProviderReportComponent,
    DataControllerCompanyComponent,
    EditTemplateModalComponent,
    ResetComponent,
    AssignamentDatepickersComponent,
    EnterpriseAssignamentsComponent,
    EnterpriseAssignamentCardComponent,
    SubmenuAssignamentsComponent,
    RubrosComponent,
    CreateRubroComponent,
    RubrosTableComponent,
    EditRubroModalComponent,
    BackLinkComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    OverlayModule,
    PlatformModule,
    ObserversModule,
    PortalModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [
    TitleServicesService,
    Dialog,
    DIALOG_SCROLL_STRATEGY_PROVIDER,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
