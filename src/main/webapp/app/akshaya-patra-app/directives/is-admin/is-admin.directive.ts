import { Directive, ElementRef, OnInit } from '@angular/core';
import { AccountService } from "../../services/auth/account.service";

@Directive({
  selector: '[showOnlyIfAdmin]'
})
export class IsAdminDirective implements OnInit {

  constructor(private el: ElementRef, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.isAdminLoggedIn$().subscribe((isAdminLoggedIn) => {
      if (!isAdminLoggedIn) {
        this.el.nativeElement.style.display = 'none';
      }
    })
  }

}
