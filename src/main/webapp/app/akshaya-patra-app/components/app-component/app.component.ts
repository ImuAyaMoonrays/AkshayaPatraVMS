import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { AccountService } from '../../services/auth/account.service';
import { ActivateService } from '../../services/activate-account/activate.service';
import { mergeMap, of } from 'rxjs';

@Component({
  selector: 'jhi-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService, private activateAccountService: ActivateService) {}

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
