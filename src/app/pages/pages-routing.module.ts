import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessIndexMapComponent } from './business-index-map/business-index-map.component';
import { ChampionsLeagueComponent } from './champions-league/champions-league.component';

import { DefaultComponent } from './dashboards/default/default.component';
import { GovernanceIndexComponent } from './governance-index/governance-index.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PersonalMilestoneComponent } from './personal-milestone/personal-milestone.component';
import { TopDashboardComponent } from './top-dashboard/top-dashboard.component';
import { TopHierarchyDashboardsComponent } from './top-hierarchy-dashboards/top-hierarchy-dashboards.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import { MobileMapsComponent } from './mobile-maps/mobile-maps.component';


const routes: Routes = [
  { path: '', redirectTo: 'topdashboard' },
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
  { path: 'personal_milestone', component:PersonalMilestoneComponent },
  { path: 'main_dashboard', component:MainDashboardComponent },
  { path: 'top_dashboard', component:TopHierarchyDashboardsComponent },
  { path: 'topdashboard', component:TopDashboardComponent },
  { path: 'buisness_index', component:BusinessIndexMapComponent },
  { path: 'governance_index', component:GovernanceIndexComponent },

  { path: 'business_report', component:BusinessReportComponent },
  { path: 'mobile_maps', component:MobileMapsComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
