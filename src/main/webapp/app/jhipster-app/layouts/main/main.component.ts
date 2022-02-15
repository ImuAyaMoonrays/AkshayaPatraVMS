import { Component, OnInit, RendererFactory2, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import dayjs from 'dayjs/esm';

import { AccountService } from 'app/jhipster-app/core/auth/account.service';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  title = 'demo1';

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  showSettings: boolean = true;
  isLoading: boolean = false;

  constructor(private router: Router, translate: TranslateService) {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] === '/user-pages/login' ||
          event['url'] === '/user-pages/login-2' ||
          event['url'] === '/user-pages/register' ||
          event['url'] === '/user-pages/register-2' ||
          event['url'] === '/user-pages/lock-screen' ||
          event['url'] === '/error-pages/404' ||
          event['url'] === '/error-pages/500'
        ) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          this.showSettings = false;

          // @ts-ignore
          document.querySelector('.main-panel').classList.add('w-100');
          // document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
          if (event['url'] === '/user-pages/login-2' || event['url'] === '/user-pages/register-2') {
            // @ts-ignore
            document.querySelector('.content-wrapper').classList.add('auth', 'auth-img-bg');
          } else if (event['url'] === '/user-pages/lock-screen') {
            // @ts-ignore
            document.querySelector('.content-wrapper').classList.add('auth', 'lock-full-bg');
          } else {
            // @ts-ignore
            document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
            // @ts-ignore
            document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
          }
          if (event['url'] === '/error-pages/404' || event['url'] === '/error-pages/500') {
            // document.querySelector('.content-wrapper').classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          this.showSettings = true;
          // @ts-ignore
          document.querySelector('.main-panel').classList.remove('w-100');
          // @ts-ignore
          document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
          // @ts-ignore
          document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
          // @ts-ignore
          document.querySelector('.content-wrapper').classList.remove('p-0');
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
