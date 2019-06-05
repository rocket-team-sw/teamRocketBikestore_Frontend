import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearBicicletaComponent } from './crear-bicicleta/crear-bicicleta.component';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { ListarBicicletaComponent } from './listar-bicicleta/listar-bicicleta.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crear-bicicleta',
        component: CrearBicicletaComponent,
        data: {
          title: 'crear-bicicleta',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
      {
        path: 'listar-bicicleta',
        component: ListarBicicletaComponent,
        data: {
          title: 'listar-bicicleta',
          expectedRole: ['ROLE_SUPER', 'ROLE_ADMIN']
        },
        canActivate: [RoleAuthGuard]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RoleAuthGuard],
  exports: [RouterModule]
})
export class BicicletaRoutingModule { }
