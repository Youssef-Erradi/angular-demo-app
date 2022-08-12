import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UsersComponent } from './components/users/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { AuthenticationGuard } from './guards/authentication.guard';

const APP_ROUTES: Routes = [
  { path: 'login',    component: LoginComponent},
  { path: '',         component: UsersComponent, pathMatch: 'full' , canActivate : [AuthenticationGuard]},
  { path: 'users',    component: UsersComponent, canActivate : [AuthenticationGuard]},
  { path: 'add',      component: UserFormComponent, canActivate : [AuthenticationGuard]},
  { path: 'edit/:id', component: UserFormComponent, canActivate : [AuthenticationGuard]},
  { path: '**',       component: NotFoundComponent, canActivate : [AuthenticationGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UsersComponent,
    UserFormComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
