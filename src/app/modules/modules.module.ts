import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ListmoduleComponent } from './listmodule/listmodule.component';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { UpdatemoduleComponent } from './updatemodule/updatemodule.component';
import { DetailmoduleComponent } from './detailmodule/detailmodule.component';
import { DeletemoduleComponent } from './deletemodule/deletemodule.component';
import { ToPairMenuComponent } from './to-pair-menu/to-pair-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateonlyModuleComponent } from './createonly-module/createonly-module.component';

@NgModule({
  imports: [
    CommonModule,
    ModulesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [ListmoduleComponent, UpdatemoduleComponent, DetailmoduleComponent, DeletemoduleComponent, ToPairMenuComponent, CreateonlyModuleComponent],
  providers: [RoleAuthGuard],
})
export class ModulesModule { }
