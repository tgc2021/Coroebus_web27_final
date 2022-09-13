import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementShelfComponent } from './achievement-shelf.component';

const routes: Routes = [
  {
     path: 'AchievementShelf', 
    component: AchievementShelfComponent ,
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementShelfRoutingModule { }
