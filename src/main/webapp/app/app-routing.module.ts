import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './akshaya-patra-app/components/home-screen/home-screen.component';
import { LoginComponent } from './akshaya-patra-app/components/login/login.component';
import { RegisterComponent } from './akshaya-patra-app/components/register/register.component';
import { ResetPasswordComponent } from './akshaya-patra-app/components/reset-password/reset-password.component';
import { EventsDashboardComponent } from './akshaya-patra-app/components/events-dashboard/events-dashboard.component';
import { EventComponent } from './akshaya-patra-app/components/event/event.component';
import { CompletedEventForPrototypeComponent } from './akshaya-patra-app/components/completed-event-for-prototype/completed-event-for-prototype.component';
import { CreateEventComponent } from './akshaya-patra-app/components/create-event/create-event.component';

// http://127.0.0.1:8080/account/activate?key=YFF7j4pQQkGHR14J5keQ
const routes: Routes = [
  {
    path: 'home',
    component: HomeScreenComponent,
    children: [
      { path: 'events', component: EventsDashboardComponent },
      { path: 'event/:id', component: EventComponent },
      { path: 'createEvent', component: CreateEventComponent },
      //prototype only
      { path: 'completedEventForPrototype', component: CompletedEventForPrototypeComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
