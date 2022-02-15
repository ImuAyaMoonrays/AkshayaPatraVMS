import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './akshaya-patra-app/components/home-screen/home-screen.component';
import { LoginComponent } from './akshaya-patra-app/components/login/login.component';
import { RegisterComponent } from './akshaya-patra-app/components/register/register.component';

// http://127.0.0.1:8080/account/activate?key=YFF7j4pQQkGHR14J5keQ
const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
