import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameSelectionRoutingModule } from './game-selection-routing.module';
import { GameSelectionComponent } from './game-selection.component';


@NgModule({
  declarations: [
    GameSelectionComponent
  ],
  imports: [
    CommonModule,
    GameSelectionRoutingModule
  ]
})
export class GameSelectionModule { }
