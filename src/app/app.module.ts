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
import { ButtonComponent } from './components/button/button.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';

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
    ButtonComponent,
    CreateUserComponent,
    UsersFormComponent,
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
