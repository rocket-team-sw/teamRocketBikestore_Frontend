import { AuthGuard } from './auth/auth-guard.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationSidebarComponent,
    ToggleFullscreenDirective,
    NgbModule,
    TranslateModule

  ],
  imports: [
    RouterModule,
    CommonModule,
    NgxSpinnerModule,
    NgbModule,
    TranslateModule


  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationSidebarComponent,
    ToggleFullscreenDirective

  ],
  providers: [AuthGuard],
})
export class SharedModule { }
