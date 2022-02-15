import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {
  title = 'demo1';

  isLoading: boolean;

  constructor(private router: Router, translate: TranslateService) {}

  ngOnInit() {
    document.querySelector('.main-panel').classList.remove('w-100');
    document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
    document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
    document.querySelector('.content-wrapper').classList.remove('p-0');
    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
}
