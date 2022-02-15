import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        // {
        //   path: 'admin',
        //   data: {
        //     authorities: [Authority.ADMIN],
        //   },
        //   canActivate: [UserRouteAccessService],
        //   loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        // },
        // {
        //   path: 'account',
        //   loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        // },
        // {
        //   path: 'login',
        //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        // },
        // {
        //   path: '',
        //   loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        // },
        // navbarRoute,
        // ...errorRoute,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
