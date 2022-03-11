import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { AccountService } from '../../services/auth/account.service';
import { map, tap } from 'rxjs/operators';
import { Account } from '../../services/auth/account.model';
import { AuthoiritiesEnum } from '../../enums/authoirities.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  parentId = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService
  ) {}

  username$: Observable<string>;
  isAdminLogin: boolean;

  ngOnInit() {
    this.username$ = this.accountService.identity().pipe(
      tap((account: Account) => {
        this.isAdminLogin = account.authorities.includes(AuthoiritiesEnum.ROLE_ADMIN);
      }),
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
