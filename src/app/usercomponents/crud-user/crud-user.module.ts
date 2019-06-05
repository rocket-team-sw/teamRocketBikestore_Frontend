import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudUserRoutingModule } from './crud-user-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToPairProfileComponent } from '../to-pair-profile/to-pair-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordByComponent } from './change-password-by/change-password-by.component';

@NgModule({
  imports: [
    CommonModule,
    CrudUserRoutingModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [CreateUserComponent, UpdateUserComponent, ToPairProfileComponent, ListUserComponent, ChangePasswordComponent, ChangePasswordByComponent],
  providers: [RoleAuthGuard],
})
export class CrudUserModule { }
