import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardsComponent } from './rewards.component';
import { NewRewardPageComponent } from './new-reward-page/new-reward-page.component';


const routes: Routes = [{ 
  path: 'rewardPoints', 
    component: NewRewardPageComponent , 
    // component: RewardsComponent,
    pathMatch: 'full'
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
