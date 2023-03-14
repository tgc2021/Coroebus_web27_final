import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import { SkeletonScreenLoaderModule } from '@coroebus/skeleton-screen-loader';
import { ImagecropperComponent } from '@pages/imagecropper/imagecropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastsContainerComponent } from '@pages/toasts-container/toasts-container.component';
import { InteractiveDashboardComponent } from './interactive-dashboard/interactive-dashboard/interactive-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [DefaultComponent, ImagecropperComponent, ToastsContainerComponent, InteractiveDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    MatExpansionModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    MatCardModule,
    SimplebarAngularModule,
    SkeletonScreenLoaderModule,
    NgbCollapseModule,
    ImageCropperModule,
    NgbModule
  ]
})
export class DashboardsModule { }
