import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from '../../constants/error.constants';
import { Subscription } from "rxjs";
import { AppConstants } from "../../constants/app.constants";
import { Registration } from "../../models/register.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  passwordStrengthSubscription: Subscription;
  passwordsDoNotMatch: boolean;
  passwordsAreStrongEnough: boolean;

  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  showTermsAndConditionsNeedsToBeAcceptedMessage = false;
  success: boolean;
  showInsufficientPasswordMessage = false;

  private readonly passwordValidators = [Validators.required,
    Validators.pattern(String.raw`^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$`),
    Validators.minLength(4),
    Validators.maxLength(50)];

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
    phoneNumber: ['', [Validators.required, Validators.pattern(AppConstants.PHONE_NUMBER_REGEX)]],
    password: ['', this.passwordValidators],
    confirmPassword: ['', this.passwordValidators],
    termsAndConditions: [false],
  });

  constructor(private router: Router, private registerService: RegisterService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.passwordStrengthSubscription = this.registerForm.valueChanges.subscribe(() => {
      this.passwordsAreStrongEnough = this.registerForm.get('password').valid;
    })

  }

  register(): void {
    this.passwordsDoNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    this.showTermsAndConditionsNeedsToBeAcceptedMessage = false;

    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.passwordsDoNotMatch = true;
    } else if (!this.registerForm.get(['termsAndConditions']).value) {
      this.showTermsAndConditionsNeedsToBeAcceptedMessage = true;
    } else {
      this.registerService.save(
        new Registration(
          this.registerForm.get('firstName').value,
          this.registerForm.get('lastName').value,
          this.registerForm.get('login').value,
          this.registerForm.get('email').value,
          password,
          this.registerForm.get('phoneNumber').value,
          'en'
        )
      ).subscribe(
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
