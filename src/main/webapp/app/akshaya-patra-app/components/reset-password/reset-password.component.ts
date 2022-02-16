import { Component } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'jhi-password-reset-init',
  templateUrl: './reset-password.html',
})
export class ResetPasswordComponent {

  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

}
