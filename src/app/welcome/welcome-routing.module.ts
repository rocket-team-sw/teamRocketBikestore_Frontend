import { LoginPageComponent } from './login-page/login-page.component';
import { WelcomeTitleComponent } from './welcome-title/welcome-title.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { PricingComponent } from './pricing/pricing.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'welcome',
        component: WelcomeTitleComponent,
        data: {
          title: 'welcome',
         expectedRole: []
        },
        // canActivate: [RoleAuthGuard]
      },
      {
        path: 'pricing',
        component: PricingComponent,
        data: {
          title: 'pricing',
         expectedRole: []
        },
        // canActivate: [RoleAuthGuard]
      },
      {
        path: 'loginPage',
        component: LoginPageComponent,
        data: {
          title: 'loginPage',
         expectedRole: []
        },
        // canActivate: [RoleAuthGuard]
      },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RoleAuthGuard],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
