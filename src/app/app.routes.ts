import { Routes } from '@angular/router';

export const routes: Routes = [

  // Página Inicial → Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login
  {
    path: 'login',
    loadComponent: () =>
      import('./view/login/login.page').then((m) => m.LoginPage),
  },

  // Registrar (Cadastro de usuário)
  {
    path: 'registrar',
    loadComponent: () =>
      import('./view/registrar/registrar.page').then((m) => m.RegistrarPage),
  },

  // Home
  {
    path: 'home',
    loadComponent: () =>
      import('./view/home/home.page').then((m) => m.HomePage),
  },

  // Cadastrar console
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('./view/cadastrar/cadastrar.page').then((m) => m.CadastrarPage),
  },

  // Detalhar console
  {
    path: 'detalhar',
    loadComponent: () => import('./view/detalhar/detalhar.page').then( m => m.DetalharPage)
  },

];



