import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BicicletaRoutingModule } from './bicicleta-routing.module';
import { CrearBicicletaComponent } from './crear-bicicleta/crear-bicicleta.component';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { ListarBicicletaComponent } from './listar-bicicleta/listar-bicicleta.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActualizarBicicletaComponent } from './actualizar-bicicleta/actualizar-bicicleta.component';

@NgModule({
  imports: [
    CommonModule,
    BicicletaRoutingModule,
    NgxDatatableModule
  ],
  declarations: [CrearBicicletaComponent, ListarBicicletaComponent, ActualizarBicicletaComponent],
  providers: [RoleAuthGuard],
})
export class BicicletaModule { }
