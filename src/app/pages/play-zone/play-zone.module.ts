import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayZoneRoutingModule } from './play-zone-routing.module';
import { PlayZoneComponent } from './play-zone.component';

import {IvyCarouselModule} from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    PlayZoneComponent
  ],
  imports: [
    CommonModule,
    IvyCarouselModule,
    PlayZoneRoutingModule
  ]
})
export class PlayZoneModule { }
