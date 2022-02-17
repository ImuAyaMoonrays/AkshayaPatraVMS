import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrototypeService } from '../../services/prototype/prototype.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private prototypeService: PrototypeService) {}

  login(): void {
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    if (username === 'admin') {
      this.prototypeService.adminLogin();
    }
    this.router.navigate(['/home']);
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  resetPassword(): void {
    this.router.navigate(['/resetPassword']);
  }
}
