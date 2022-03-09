import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, mergeMap, tap } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { tick } from '@angular/core/testing';
import { PasswordResetFinishService } from '../../services/password-reset/finish/password-reset-finish.service';

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
})
export class NewPasswordComponent implements OnDestroy {
  success = false;
  resetRequestSubscription: Subscription;
  newPasswordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  });

  constructor(
    private passwordResetFinishService: PasswordResetFinishService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  requestReset(): void {
    this.resetRequestSubscription = this.route.queryParams
      .pipe(
        mergeMap(params => {
          return this.passwordResetFinishService.save(params.key, this.newPasswordForm.get(['newPassword'])!.value);
        }),
        tap(() => (this.success = true)),
        delay(2500),
        tap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.resetRequestSubscription!.unsubscribe();
  }
}
