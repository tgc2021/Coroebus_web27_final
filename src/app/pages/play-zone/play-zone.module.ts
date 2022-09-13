import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayZoneRoutingModule } from './play-zone-routing.module';
import { PlayZoneComponent } from './play-zone.component';


@NgModule({
  declarations: [
    PlayZoneComponent
  ],
  imports: [
    CommonModule,
    PlayZoneRoutingModule
  ]
})
export class PlayZoneModule { }
