import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule } from '@angular/common/http';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';
import { ChampionsLeagueComponent } from './champions-league/champions-league.component';
import { PersonalMilestoneComponent } from './personal-milestone/personal-milestone.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SkeletonScreenLoaderModule } from '../../../projects/coroebus/skeleton-screen-loader/src/lib/skeleton-screen-loader.module';
import { MatCardModule } from '@angular/material/card';
import { TopHierarchyDashboardsComponent } from './top-hierarchy-dashboards/top-hierarchy-dashboards.component';
import { TopDashboardComponent } from './top-dashboard/top-dashboard.component';
import { BusinessIndexMapComponent } from './business-index-map/business-index-map.component';
import { IntroductionVideoComponent } from './introduction-video/introduction-video.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { GovernanceIndexComponent } from './governance-index/governance-index.component';
import { TableauModule } from 'ngx-tableau';
import { BusinessHeadMapComponent } from './business-head-map/business-head-map.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MobileMapsComponent } from './mobile-maps/mobile-maps.component';


@NgModule({
  declarations: [
    NotificationPopupComponent,
    ChampionsLeagueComponent,
    PersonalMilestoneComponent,
    MainDashboardComponent,
    TopHierarchyDashboardsComponent,
    TopDashboardComponent,
    BusinessIndexMapComponent,
    IntroductionVideoComponent,
    GovernanceIndexComponent,
    BusinessHeadMapComponent,
    BusinessReportComponent,
    MobileMapsComponent
  
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    MatSnackBarModule,
    MatExpansionModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    TableauModule,
    DashboardsModule,
    HttpClientModule,
    SkeletonScreenLoaderModule,
    MatCardModule,
    UIModule,
    WidgetModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    
  ],
})
export class PagesModule { }
