import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeTitleComponent } from './welcome-title/welcome-title.component';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { PricingComponent } from './pricing/pricing.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    FormsModule,
  ],
  declarations: [WelcomeTitleComponent, PricingComponent, LoginPageComponent],
  providers: [RoleAuthGuard],
})
export class WelcomeModule { }
