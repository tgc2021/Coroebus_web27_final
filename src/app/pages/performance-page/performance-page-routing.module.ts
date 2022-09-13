import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformancePageComponent } from './performance-page.component';

const routes: Routes = [
  {
    path: 'page',
    component: PerformancePageComponent,
    data: { animation: 'performance-view' },
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformancePageRoutingModule { }
