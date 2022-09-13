import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'theme', loadChildren: () => import('../pages/theme-selection/theme-selection.module').then(m => m.ThemeSelectionModule), canActivate: [AuthGuard] },
  { path: 'game', loadChildren: () => import('../pages/game-selection/game-selection.module').then(m => m.GameSelectionModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
