import { ChangePasswordByComponent } from './change-password-by/change-password-by.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { ListUserComponent } from '../list-user/list-user.component';
import { ToPairProfileComponent } from '../to-pair-profile/to-pair-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usercomponents',
        component: CreateUserComponent,
        data: {
          title: 'usercomponents',
          expectedRole: ['ROLE_SUPER']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'update-user',
        component: UpdateUserComponent,
        data: {
          title: 'update-user',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'list-user',
        component: ListUserComponent,
        data: {
          title: 'list-user',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'topair-profile',
        component: ToPairProfileComponent,
        data: {
          title: 'topair-profile',
          expectedRole: ['ROLE_SUPER']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'change-password',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN', 'ROLE_USER']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'change-password-by',
        component: ChangePasswordByComponent,
        data: {
          title: 'change-password-by',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RoleAuthGuard],
  exports: [RouterModule]
})
export class CrudUserRoutingModule { }
