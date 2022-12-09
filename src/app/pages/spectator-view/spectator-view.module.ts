import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpectatorViewRoutingModule } from './spectator-view-routing.module';
import { SpectatorViewComponent } from './spectator-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpectatorViewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    SpectatorViewRoutingModule
  ]
})
export class SpectatorViewModule { }
