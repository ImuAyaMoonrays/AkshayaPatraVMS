import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './akshaya-patra-app/components/home-screen/home-screen.component';
import { LoginComponent } from './akshaya-patra-app/components/login/login.component';
import { RegisterComponent } from './akshaya-patra-app/components/register/register.component';
import { EventsDashboardComponent } from './akshaya-patra-app/components/events-dashboard/events-dashboard.component';
import { EventComponent } from './akshaya-patra-app/components/event/event.component';
import { CreateEventComponent } from './akshaya-patra-app/components/create-event/create-event.component';
import { DocsComponent } from './akshaya-patra-app/components/docs/docs.component';
import { UserRouteAccessService } from './akshaya-patra-app/services/auth/user-route-access.service';
import { PasswordResetInitComponent } from './akshaya-patra-app/components/reset-password-init/reset-password-init.component';
import { PasswordResetFinishService } from './akshaya-patra-app/services/password-reset/finish/password-reset-finish.service';
import { NewPasswordComponent } from './akshaya-patra-app/components/new-password/new-password.component';

// http://127.0.0.1:8080/account/activate?key=YFF7j4pQQkGHR14J5keQ
const routes: Routes = [
  {
    path: 'home',
    component: HomeScreenComponent,
    canActivate: [UserRouteAccessService],
    children: [
      { path: 'events', component: EventsDashboardComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'createEvent', component: CreateEventComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'account/activate', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'swagger', component: DocsComponent },
  { path: 'resetPassword', component: PasswordResetInitComponent },
  { path: 'account/reset/finish', component: NewPasswordComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
