import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from './shared/logged.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'newUser', loadChildren: () => import('./pages/new-user/new-user.module').then(m => m.NewUserModule) },
  { path: 'home',canActivate:[LoggedGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'detail/:name',canActivate:[LoggedGuard], loadChildren: () => import('./components/pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
