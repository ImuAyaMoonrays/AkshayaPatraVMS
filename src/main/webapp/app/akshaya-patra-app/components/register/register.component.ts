import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../constants/error.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  showTermsAndConditionsNeedsToBeAcceptedMessage = false;
  success: boolean;

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    termsAndConditions: [false],
  });

  constructor(private router: Router, private registerService: RegisterService, private fb: FormBuilder) {}

  ngOnInit() {}

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    this.showTermsAndConditionsNeedsToBeAcceptedMessage = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else if (!this.registerForm.get(['termsAndConditions']).value) {
      this.showTermsAndConditionsNeedsToBeAcceptedMessage = true;
    } else {
      const login = this.registerForm.get(['login'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      this.registerService.save({ login, email, password, langKey: 'en' }).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }

  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }
}
