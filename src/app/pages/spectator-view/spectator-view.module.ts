import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpectatorViewRoutingModule } from './spectator-view-routing.module';
import { SpectatorViewComponent } from './spectator-view.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    SpectatorViewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    SpectatorViewRoutingModule
  ]
})
export class SpectatorViewModule { }
