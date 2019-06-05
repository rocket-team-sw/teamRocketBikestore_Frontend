import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenucomponentRoutingModule } from './menucomponent-routing.module';
import { CreatemenuComponent } from './createmenu/createmenu.component';
import { RoleAuthGuard } from 'app/shared/auth/roleAuth-guard.service';
import { ListmenuComponent } from './listmenu/listmenu.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    MenucomponentRoutingModule,
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [CreatemenuComponent, ListmenuComponent, UpdateMenuComponent, DeleteMenuComponent],
  providers: [RoleAuthGuard]
})
export class MenucomponentModule { }
