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

@NgModule({
  declarations: [DefaultComponent, ImagecropperComponent, ToastsContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    SimplebarAngularModule,
    SkeletonScreenLoaderModule,
    NgbCollapseModule,
    ImageCropperModule,
    NgbModule
  ]
})
export class DashboardsModule { }
