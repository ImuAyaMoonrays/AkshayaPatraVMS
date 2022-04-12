import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/auth/account.service';
import { LoginService } from '../../services/login/login.service';
import { ActivateService } from '../../services/activate-account/activate.service';
import { Store } from "@ngxs/store";
import { AppActions } from "../../store/actions/app.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authenticationError: boolean;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private activateAccountService: ActivateService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    const url = window.location.href;
    if (url.includes('key=')) {
      const keyEqualsIndex = url.lastIndexOf('=');
      const activationKey = url.slice(keyEqualsIndex + 1);
      this.activateAccountService.get(activationKey).subscribe();
    }
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.accountService.isAdminLoggedIn() ? this.router.navigate(['/home/admin/events/upcoming']) :
          this.router.navigate(['/home/user/events/upcoming']);
      }
    });
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            if (this.accountService.isAdminLoggedIn()) {
              this.store.dispatch(AppActions.UpdateAllAdminEvents);
              this.router.navigate(['/home/admin/events/upcoming'])
            } else {
              this.store.dispatch(AppActions.UpdateAllNormalUserEvents);
              this.router.navigate(['/home/user/events/upcoming']);
            }
          }
        },
        () => (this.authenticationError = true)
      );
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  resetPassword(): void {
    this.router.navigate(['/resetPassword']);
  }

  navigateSwagger(): void {
    this.router.navigate(['/swagger']);
  }
}
