import { RouteInfo } from './sidebar.metadata';




// Definición de las rutas para el sidebar
export const ROUTES: RouteInfo[] = [

  {
    path: '', title: 'Inicio', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
      { path: '/welcome/welcome', title: 'Bienvenido', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/welcome/pricing', title: 'Precios', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },

  {
    path: '', title: 'Gestión Bicicletas', icon: 'ft-layout', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
      { path: '/bicicleta/listar-bicicleta', title: 'Listar Bicicleta', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
];
