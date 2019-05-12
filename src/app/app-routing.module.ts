import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'resultados', loadChildren: './resultados/resultados.module#ResultadosPageModule' },
  { path: 'contacto', loadChildren: './contacto/contacto.module#ContactoPageModule' },
  { path: 'posciciones/:id', loadChildren: './posciciones/posciciones.module#PoscicionesPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
