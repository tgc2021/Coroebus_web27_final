import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardsComponent } from './rewards.component';

const routes: Routes = [{ 
  path: 'rewardPoints', 
component: RewardsComponent ,
pathMatch: 'full'

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
