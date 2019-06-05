import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [

  // welcome
  {
    path: 'welcome',
    loadChildren: './welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },

  // Módulos
  {
    path: 'modules',
    loadChildren: './modules/modules.module#ModulesModule'
  },
  // Users
  {
    path: 'crud-user',
    loadChildren: './usercomponents/crud-user/crud-user.module#CrudUserModule'
  },
  // Gestion Bicicletas
  {
    path: 'bicicleta',
    loadChildren: './bicicleta/bicicleta.module#BicicletaModule'
  }
];
