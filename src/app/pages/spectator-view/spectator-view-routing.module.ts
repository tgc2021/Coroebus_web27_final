import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpectatorViewComponent } from './spectator-view.component';

const routes: Routes = [{ 
  path: 'spectatorView', 
  component: SpectatorViewComponent,
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpectatorViewRoutingModule { }
