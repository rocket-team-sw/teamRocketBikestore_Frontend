import { UpdatemoduleComponent } from './updatemodule/updatemodule.component';
import { ListmoduleComponent } from './listmodule/listmodule.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { DetailmoduleComponent } from './detailmodule/detailmodule.component';
import { CreateonlyModuleComponent } from './createonly-module/createonly-module.component';
import { ToPairMenuComponent } from './to-pair-menu/to-pair-menu.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listmodule',
        component: ListmoduleComponent,
        data: {
          title: 'listmodule',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'pairmodule',
        component: ToPairMenuComponent,
        data: {
          title: 'createmodule',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'detailmodule',
        component: DetailmoduleComponent,
        data: {
          title: 'detailmodule',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'updatemodule',
        component: UpdatemoduleComponent,
        data: {
          title: 'updatemodule',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'createonlymodule',
        component: CreateonlyModuleComponent,
        data: {
          title: 'createmodule',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RoleAuthGuard],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
