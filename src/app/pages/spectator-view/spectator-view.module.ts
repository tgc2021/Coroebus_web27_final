import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpectatorViewRoutingModule } from './spectator-view-routing.module';
import { SpectatorViewComponent } from './spectator-view.component';


@NgModule({
  declarations: [
    SpectatorViewComponent
  ],
  imports: [
    CommonModule,
    SpectatorViewRoutingModule
  ]
})
export class SpectatorViewModule { }
