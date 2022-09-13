import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DashboardPagesSkeletonComponent } from './dashboard-pages-skeleton.component';
import { NestedListSkeletonComponent } from './nested-list-component';
import { SkeletonScreenLoaderComponent } from './skeleton-screen-loader.component';
import { TableSkeletonComponent } from './table-skeleton.component';



@NgModule({
  declarations: [
    SkeletonScreenLoaderComponent,
    TableSkeletonComponent,
    NestedListSkeletonComponent,
    DashboardPagesSkeletonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkeletonScreenLoaderComponent,
    TableSkeletonComponent,
    NestedListSkeletonComponent,
    DashboardPagesSkeletonComponent
  ]
})
export class SkeletonScreenLoaderModule {
  static forRoot(): ModuleWithProviders<SkeletonScreenLoaderModule> {
    return {
      ngModule: SkeletonScreenLoaderModule
    };
  }
}
