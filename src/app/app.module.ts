import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { CreateCategoriesModalComponent } from './components/modals/create-categories-modal/create-categories-modal.component';
import { EditCategoriesModalComponent } from './components/modals/edit-categories-modal/edit-categories-modal.component';
import { SubmenuProvidersComponent } from './components/providers/submenu-providers/submenu-providers.component';
import { AssignmentsComponent } from './pages/providers/assignments/assignments.component';
import { AssignmentsTableComponent } from './components/providers/assignments-table/assignments-table.component';
import { CreateAssignmentsModalComponent } from './components/modals/create-assignments-modal/create-assignments-modal.component';
import { EditAssignmentsModalComponent } from './components/modals/edit-assignments-modal/edit-assignments-modal.component';
import { InstructionsComponent } from './pages/providers/instructions/instructions.component';
import { InstructionsTableComponent } from './components/providers/instructions-table/instructions-table.component';
import { CreateInstructionsModalComponent } from './components/modals/create-instructions-modal/create-instructions-modal.component';
import { EditInstructionsModalComponent } from './components/modals/edit-instructions-modal/edit-instructions-modal.component';
import { ProductionComponent } from './pages/providers/production/production.component';
import { ProductionTableComponent } from './components/providers/production-table/production-table.component';
import { CreateProductionModalComponent } from './components/modals/create-production-modal/create-production-modal.component';
import { EditProductionModalComponent } from './components/modals/edit-production-modal/edit-production-modal.component';
import { ViewProductionModalComponent } from './components/modals/view-production-modal/view-production-modal.component';
import { DispatchComponent } from './pages/providers/dispatch/dispatch.component';
import { DispatchTableComponent } from './components/provider/dispatch-table/dispatch-table.component';
import { CreateDispatchModalComponent } from './components/modals/create-dispatch-modal/create-dispatch-modal.component';
import { EditDispatchModalComponent } from './components/modals/edit-dispatch-modal/edit-dispatch-modal.component';
import { ViewDispatchModalComponent } from './components/modals/view-dispatch-modal/view-dispatch-modal.component';
import { SettingsComponent } from './pages/providers/settings/settings.component';

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
    CreateCategoriesModalComponent,
    EditCategoriesModalComponent,
    SubmenuProvidersComponent,
    AssignmentsComponent,
    AssignmentsTableComponent,
    CreateAssignmentsModalComponent,
    EditAssignmentsModalComponent,
    InstructionsComponent,
    InstructionsTableComponent,
    CreateInstructionsModalComponent,
    EditInstructionsModalComponent,
    ProductionComponent,
    ProductionTableComponent,
    CreateProductionModalComponent,
    EditProductionModalComponent,
    ViewProductionModalComponent,
    DispatchComponent,
    DispatchTableComponent,
    CreateDispatchModalComponent,
    EditDispatchModalComponent,
    ViewDispatchModalComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
