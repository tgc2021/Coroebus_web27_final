import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeSelectionComponent } from './theme-selection.component';

const routes: Routes = [
  {
    path: 'selection',
    component: ThemeSelectionComponent,
    data: { animation: 'theme-selection' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeSelectionRoutingModule { }
