import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigate(['/home']);
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  resetPassword(): void {
    this.router.navigate(['/resetPassword']);
  }
}
