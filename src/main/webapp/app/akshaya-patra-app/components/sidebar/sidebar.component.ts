import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PrototypeService } from '../../services/prototype/prototype.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  parentId = '';
  isAdminLogin$: BehaviorSubject<boolean>;

  constructor(private router: Router, private prototypeService: PrototypeService) {}

  ngOnInit() {
    this.isAdminLogin$ = this.prototypeService.isAdminAccount$;
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
    this.prototypeService.logout();
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
