import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { MatriculeComponent } from 'src/app/pages/employee/matricule/matricule.component';
import { PricesComponent } from './components/prices/prices.component';


import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  // Default route redirects to the matricule page
  {
    path: '',
    redirectTo: '/v1/matricule',
    pathMatch: 'full',
  },
  // Matricule route accessible before login
  {
    path: 'v1/matricule',
    component: MatriculeComponent, // This will be the first page displayed
  },

  // Main route for v1 with employee-related components
  {
    path: 'v1',
    loadChildren: () =>
      import('../app/pages/employee/employee.routes').then(
        (m) => m.EmployeeRoutes
      ),
    canActivate: [AuthGuard], // Protect the routes with the auth guard
  },

  // prices
  { path: 'prices', component: PricesComponent, canActivate: [AuthGuard] },



  // Full layout routes, all of these are protected with AuthGuard
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard],
      },

      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'menu-table',
        loadChildren: () =>
          import('../app/components/menu-table/menu-tables.routes').then(
            (m) => m.MenuTableRoutes
          ),
      },
    ],
  },
  // Catch-all route for undefined paths
  {
    path: '**',
    redirectTo: 'authentication/error',
  },

  // Make sure the default route is always set correctly
  { path: '', redirectTo: '/v1/matricule', pathMatch: 'full' },
];
