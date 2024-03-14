import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayZoneComponent } from './play-zone.component';
import { NewPlayzoneComponent } from './new-playzone/new-playzone.component';

const routes: Routes = [
  // { path: 'play', 
  // component: PlayZoneComponent ,
  //  pathMatch: 'full'
   
  // }];
  { path: 'play', 
  component: NewPlayzoneComponent,
   pathMatch: 'full'
   
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayZoneRoutingModule { }
