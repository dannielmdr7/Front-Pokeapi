import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoggedOutGuard } from './shared/logged-out.guard';
import { LoggedGuard } from './shared/logged.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login',canActivate:[LoggedOutGuard], loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'newUser',canActivate:[LoggedOutGuard], loadChildren: () => import('./pages/new-user/new-user.module').then(m => m.NewUserModule) },
  { path: 'loged', component:LayoutComponent,canActivate:[LoggedGuard],children:[
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: 'detail/:name', loadChildren: () => import('./components/pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule) },

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
