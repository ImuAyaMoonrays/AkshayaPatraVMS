import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordResetInitService } from '../../services/password-reset/init/password-reset-init.service';

@Component({
  selector: 'jhi-password-reset-init',
  templateUrl: './reset-password-init.html',
})
export class PasswordResetInitComponent {
  success = false;
  resetRequestForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
  });

  constructor(private passwordResetInitService: PasswordResetInitService, private fb: FormBuilder) {}

  requestReset(): void {
    this.passwordResetInitService.save(this.resetRequestForm.get(['email'])!.value).subscribe(() => (this.success = true));
  }
}
