import { AuthGuard } from './../../shared/auth/auth-guard.service';
import { AppModule } from './../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { LoginPageComponent } from './login/login-page.component';




@NgModule({
  providers: [
    AuthGuard
  ],
  imports: [
    CommonModule,
    ContentPagesRoutingModule,
    FormsModule,


  ],
  declarations: [
    LoginPageComponent,
  ]
})
export class ContentPagesModule { }
