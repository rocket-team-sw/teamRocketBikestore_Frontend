import { ListmenuComponent } from './listmenu/listmenu.component';
import { CreatemenuComponent } from './createmenu/createmenu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listmenu',
        component: ListmenuComponent,
        data: {
          title: 'listmenu',
          expectedRole: ['ROLE_SUPER']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'createmenu',
        component: CreatemenuComponent,
        data: {
          title: 'createmenu',
          expectedRole: ['ROLE_SUPER']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'updatemenu',
        component: UpdateMenuComponent,
        data: {
          title: 'updatemenu',
          expectedRole: ['ROLE_SUPER']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'deletemenu',
        component: DeleteMenuComponent,
        data: {
          title: 'deletemenu',
          expectedRole: ['ROLE_SUPER']
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
export class MenucomponentRoutingModule { }
