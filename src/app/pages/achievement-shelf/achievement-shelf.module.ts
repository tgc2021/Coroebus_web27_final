import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementShelfRoutingModule } from './achievement-shelf-routing.module';
import { AchievementShelfComponent } from './achievement-shelf.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MdePopoverModule } from '@material-extended/mde';


@NgModule({
  declarations: [
    AchievementShelfComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    IvyCarouselModule,
    MdePopoverModule,
    AchievementShelfRoutingModule
  ]
})
export class AchievementShelfModule { }
