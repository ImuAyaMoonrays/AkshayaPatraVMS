import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'jhi-promote-to-admin',
  templateUrl: './promote-to-admin.component.html',
  styleUrls: ['./promote-to-admin.component.scss']
})
export class PromoteToAdminComponent implements OnInit {

  selectedUserFormControl = new FormControl(null);

  constructor() { }

  ngOnInit(): void {
  }

  promoteUser(): void {

  }

}
