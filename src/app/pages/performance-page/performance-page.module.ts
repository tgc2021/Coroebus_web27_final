import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformancePageRoutingModule } from './performance-page-routing.module';
import { PerformancePageComponent } from './performance-page.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerformancePageComponent
  ],
  imports: [
    CommonModule,
    PerformancePageRoutingModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class PerformancePageModule { }
