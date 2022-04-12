import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './akshaya-patra-app/components/home-screen/home-screen.component';
import { LoginComponent } from './akshaya-patra-app/components/login/login.component';
import { RegisterComponent } from './akshaya-patra-app/components/register/register.component';
import { EventComponent } from './akshaya-patra-app/components/event/event.component';
import { CreateEventComponent } from './akshaya-patra-app/components/create-event/create-event.component';
import { DocsComponent } from './akshaya-patra-app/components/docs/docs.component';
import { UserRouteAccessService } from './akshaya-patra-app/services/auth/user-route-access.service';
import { PasswordResetInitComponent } from './akshaya-patra-app/components/reset-password-init/reset-password-init.component';
import { NewPasswordComponent } from './akshaya-patra-app/components/new-password/new-password.component';
import { UpcomingUnregisteredEventsComponent } from "./akshaya-patra-app/components/upcoming-events/upcoming-unregistered-events.component";
import { CompletedEventsComponent } from "./akshaya-patra-app/components/completed-events/completed-events.component";
import { RegisteredEventsComponent } from "./akshaya-patra-app/components/registered-events/registered-events.component";
import { AdminUpcomingEventsComponent } from "./akshaya-patra-app/components/admin-upcoming-events/admin-upcoming-events.component";
import { AdminPastEventsComponent } from "./akshaya-patra-app/components/admin-past-events/admin-past-events.component";
import { AuthoiritiesEnum } from "./akshaya-patra-app/enums/authoirities.enum";
import { RouteAcccessByRequiredAuthoritiesService } from "./akshaya-patra-app/services/route-access-by-authority/route-acccess-by-required-authorities.service";
import { PromoteToAdminComponent } from "./akshaya-patra-app/components/promote-to-admin/promote-to-admin.component";
import { ProfileComponent } from "./akshaya-patra-app/components/profile/profile.component";

// http://127.0.0.1:8080/account/activate?key=YFF7j4pQQkGHR14J5keQ
const routes: Routes = [
  {
    path: 'home',
    component: HomeScreenComponent,
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: 'admin',
        data: {
          authorities: [AuthoiritiesEnum.ROLE_ADMIN, AuthoiritiesEnum.ROLE_USER]
        },
        canActivate: [RouteAcccessByRequiredAuthoritiesService],
        children: [
          {path: 'events/upcoming', component: AdminUpcomingEventsComponent},
          {path: 'events/upcoming/:id', component: EventComponent},
          {path: 'events/past', component: AdminPastEventsComponent},
          {path: 'events/past/:id', component: EventComponent},
          {path: 'createEvent', component: CreateEventComponent},
          {path: 'promote', component: PromoteToAdminComponent},
        ]
      },
      {
        path: 'user',
        data: {
          authorities: [AuthoiritiesEnum.ROLE_USER]
        },
        canActivate: [RouteAcccessByRequiredAuthoritiesService],
        children: [
          {path: 'events/upcoming', component: UpcomingUnregisteredEventsComponent},
          {path: 'events/upcoming/:id', component: EventComponent},
          {path: 'events/completed', component: CompletedEventsComponent},
          {path: 'events/completed/:id', component: EventComponent},
          {path: 'events/registered', component: RegisteredEventsComponent},
          {path: 'events/registered/:id', component: EventComponent},
        ]
      },
      {path: 'profile', component: ProfileComponent},
    ],
  },
  {path: 'login', component: LoginComponent},
  {path: 'account/activate', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'swagger', component: DocsComponent},
  {path: 'resetPassword', component: PasswordResetInitComponent},
  {path: 'account/reset/finish', component: NewPasswordComponent},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
