import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChampionsLeagueComponent } from './champions-league/champions-league.component';

import { DefaultComponent } from './dashboards/default/default.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent, pathMatch: 'full' },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'notification', loadChildren: () => import('./notification-list/notification-list.module').then(m => m.NotificationListModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'performance', loadChildren: () => import('./performance-page/performance-page.module').then(m => m.PerformancePageModule) },
  { path: 'playzone', loadChildren: () => import('./play-zone/play-zone.module').then(m => m.PlayZoneModule) },
  { path: 'reward', loadChildren: () => import('./rewards/rewards.module').then(m => m.RewardsModule) },
  { path: 'spectator', loadChildren: () => import('./spectator-view/spectator-view.module').then(m => m.SpectatorViewModule) },
  { path: 'learning', loadChildren: () => import('./learning-academy/learning-academy.module').then(m => m.LearningAcademyModule) },
  { path: 'Achievement', loadChildren: () => import('./achievement-shelf/achievement-shelf.module').then(m => m.AchievementShelfModule) },
  { path: 'champions_league', component:ChampionsLeagueComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
