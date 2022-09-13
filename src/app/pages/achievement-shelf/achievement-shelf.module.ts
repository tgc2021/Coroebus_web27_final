import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementShelfRoutingModule } from './achievement-shelf-routing.module';
import { AchievementShelfComponent } from './achievement-shelf.component';


@NgModule({
  declarations: [
    AchievementShelfComponent
  ],
  imports: [
    CommonModule,
    AchievementShelfRoutingModule
  ]
})
export class AchievementShelfModule { }
