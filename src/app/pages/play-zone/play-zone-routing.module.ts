import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayZoneComponent } from './play-zone.component';

const routes: Routes = [
  { path: 'play', 
  component: PlayZoneComponent ,
   pathMatch: 'full'
   
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayZoneRoutingModule { }
