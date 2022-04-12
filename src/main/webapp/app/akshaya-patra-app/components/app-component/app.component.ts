import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventService } from "../../services/event/event.service";
import { AccountService } from "../../services/auth/account.service";

@Component({
  selector: 'jhi-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private eventService: EventService, private accountService: AccountService) {
  }

  ngOnInit() {

    // if (isDevMode()) {
    //   this.accountService.isAdminLoggedIn$().subscribe((isAdminLoggedIn) => {
    //     isAdminLoggedIn && this.addTestData();
    //   })
    // }

    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  private addTestData() {

  }
}
