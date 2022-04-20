import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AdminPromotionService } from "../../services/admin-promotion/admin-promotion.service";
import { Observable } from "rxjs";
import { Account } from "../../services/auth/account.model";
import { UsersService } from "../../services/users/users.service";
import {CsvExportService} from "../../services/csv-export/csv-export.service";

@Component({
  selector: 'jhi-promote-to-admin',
  templateUrl: './promote-to-admin.component.html',
  styleUrls: ['./promote-to-admin.component.scss']
})
export class PromoteToAdminComponent implements OnInit {

  normalUsers$: Observable<Account[]>;
  selectedUserFormControl = new FormControl(null);
  promotedUserId: number;
  isUserSuccessfulyPromoted: boolean;
  showPromotionFailureMessage: boolean;
  showDemotionSuccessMessage: boolean;
  showDemotionFailureMessage: boolean;

  constructor(private adminPromotionService: AdminPromotionService,
              private csvExportService: CsvExportService,
              private usersService: UsersService) { }

  ngOnInit(): void {
    this.normalUsers$ = this.usersService.allNormalUsers$();
  }

  downloadAllVolunteers(): void {
    this.csvExportService.csvOfAllVolunteers$()
  }

  downloadAllEvents(): void {
    this.csvExportService.csvOfAllEventInfo$()
  }

  promoteUser(): void {
    this.adminPromotionService.promoteToAdmin$(this.selectedUserFormControl.value).subscribe(
      () => {
        this.isUserSuccessfulyPromoted = true;
        this.promotedUserId = this.selectedUserFormControl.value;
      },
      () => {
        this.showPromotionFailureMessage = true;
      },
    );
  }

  undoPromotion(): void {
    this.adminPromotionService.demoteToNormalUser$(this.promotedUserId).subscribe();
    this.isUserSuccessfulyPromoted = false;
    this.promotedUserId = null;
  }

}
