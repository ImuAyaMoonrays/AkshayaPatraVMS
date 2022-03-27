import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { AccountService } from '../../services/auth/account.service';
import { map } from 'rxjs/operators';
import { Account } from '../../services/auth/account.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  parentId = '';
  isEventActive$: Observable<boolean>;
  isStartUrlAndIsEvent: boolean;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService
  ) {}

  username$: Observable<string>;

  ngOnInit() {

    // this.isStartUrlAndIsEvent = document.URL.includes('events');

    // this.isEventActive$ = this.router.events.pipe(
    //   tap(console.log),
    //   filter(event => event instanceof NavigationEnd),
    //   tap(() => this.isStartUrlAndIsEvent = false),
    //   map((navigationEnd: NavigationEnd) => navigationEnd.url.includes('events'))
    // )
    this.username$ = this.accountService.identity().pipe(
      map((account: Account) => {
        return account.login;
      })
    );

    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  clickedMenu(event) {
    var target = event.currentTarget;
    let parentId = target.id;
    if (parentId == this.parentId) {
      this.parentId = '';
    } else {
      this.parentId = target.id;
    }
  }
}
