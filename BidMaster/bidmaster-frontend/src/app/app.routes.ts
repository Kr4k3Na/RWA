import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page').then((m) => m.LandingPage),
  },
  {
    path: 'proizvod/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: 'prijava',
    loadComponent: () => import('./pages/login-register/login-register').then((m) => m.LoginRegister),
    data: { mode: 'login' },
  },
  {
    path: 'registracija',
    loadComponent: () => import('./pages/login-register/login-register').then((m) => m.LoginRegister),
    data: { mode: 'register' },
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard)
  },
  { path: '**', redirectTo: '' },
];
