import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { filter, mergeMap, Observable, tap } from "rxjs";
import { Account } from "../../services/auth/account.model";
import { AppState } from "../../store/states/App.state";
import { Store } from "@ngxs/store";
import { FormBuilder, Validators } from "@angular/forms";
import { AccountService } from "../../services/auth/account.service";
import { shareReplay } from "rxjs/operators";
import { AppConstants } from "../../constants/app.constants";

@Component({
  selector: 'jhi-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedInUser$: Observable<Account>;

  isSuccess: boolean;
  isEditing: boolean;
  buttonFunction: Function;
  buttonText: string;
  profileForm = this.fb.group({
    firstName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    lastName: [undefined, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(AppConstants.PHONE_NUMBER_REGEX)]]
  });

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private store: Store,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.store.select(AppState.authenticatedUser).pipe(
      filter(account => !!account),
      tap((account) => {
        this.profileForm.get('firstName').setValue(account.firstName);
        this.profileForm.get('lastName').setValue(account.lastName);
        this.profileForm.get('email').setValue(account.email);
        this.profileForm.get('phoneNumber').setValue(account.phoneNumber);
      }),
      shareReplay(1)
    )
    this.assignEditButton();
  }

  private assignEditButton() {
    this.buttonFunction = this.edit;
    this.buttonText = 'Edit';
  }

  private assignSaveButton() {
    this.buttonFunction = this.save;
    this.buttonText = 'Save';
  }


  save(): void {
    if (this.profileForm.valid) {
      this.loggedInUser$.pipe(
        mergeMap((account) => {
          // caution - edited in pipe
          account.firstName = this.profileForm.get('firstName')!.value;
          account.lastName = this.profileForm.get('lastName')!.value;
          account.email = this.profileForm.get('email')!.value;
          account.phoneNumber = this.profileForm.get('phoneNumber')!.value;
          return this.accountService.save(account);
        }),
        tap(() => {
          this.accountService.identity(true);
          this.isSuccess = true;
          this.isEditing = false;
          this.assignEditButton()
        })
      ).subscribe();
    }
  }

  edit(): void {
    this.isEditing = true;
    this.assignSaveButton();
  }


}
