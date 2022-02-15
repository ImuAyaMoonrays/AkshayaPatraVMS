import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo1';

  showSidebar: boolean = true;
  showFooter: boolean = true;
  showSettings: boolean = true;
  isLoading: boolean;

  constructor(private router: Router, translate: TranslateService) {
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        translate.use('en');
        if (this.isNoSidebarPage(event)) {
          this.hideMainUserInterface();
          if (this.isLockScreenEvent(event)) {
            this.addLockScreenCss();
          } else {
            this.removeCss();
          }
          if (this.isErrorPageEvent(event)) {
            this.addErrorPageCss();
          }
        } else {
          this.showMainUserInterface();
          // /Users/dylanrasch/PersonalProjects/ocdShieldNew/
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

  private isNoSidebarPage(event: NavigationStart): boolean {
    // return event['url'] == `/${RoutePathsEnum.LOGIN}` ||
    //   event['url'].includes('key') ||
    //   event['url'] == `/${RoutePathsEnum.RESET_PASSWORD}` ||
    //   event['url'] == `/${RoutePathsEnum.NEW_PASSWORD}` ||
    //   event['url'] == '/' ||
    //   event['url'] == '/404' ||
    //   event['url'] == `/${RoutePathsEnum.REGISTER}` ||
    //   event['url'] == '/user-pages/lock-screen' ||
    //   event['url'] == '/error-pages/404' ||
    //   event['url'] == '/error-pages/500';
    return false;
  }

  private isLockScreenEvent(event: NavigationStart) {
    return event['url'] == '/user-pages/lock-screen';
  }

  private hideMainUserInterface() {
    this.showSidebar = false;
    this.showFooter = false;
    this.showSettings = false;
    document.querySelector('.main-panel').classList.add('w-100');
    document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
  }

  private isErrorPageEvent(event: NavigationStart) {
    return event['url'] == '/404' || event['url'] == '/error-pages/500';
  }

  private removeCss() {
    document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
    document.querySelector('.content-wrapper').classList.remove('auth', 'lock-full-bg');
  }

  private showMainUserInterface() {
    this.showSidebar = true;
    this.showFooter = true;
    this.showSettings = true;
    document.querySelector('.main-panel').classList.remove('w-100');
    document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
    document.querySelector('.content-wrapper').classList.remove('auth', 'auth-img-bg');
    document.querySelector('.content-wrapper').classList.remove('p-0');
  }

  private addErrorPageCss() {
    document.querySelector('.content-wrapper').classList.add('p-0');
  }

  private addLockScreenCss() {
    document.querySelector('.content-wrapper').classList.add('auth', 'lock-full-bg');
  }

  private addLogin2OrRegister2Css() {
    document.querySelector('.content-wrapper').classList.add('auth', 'auth-img-bg');
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    // for later
    // this.router.navigate(['/user-pages/login'])
  }
}
