import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningAcademyRoutingModule } from './learning-academy-routing.module';
import { LearningAcademyComponent } from './learning-academy.component';


@NgModule({
  declarations: [
    LearningAcademyComponent
  ],
  imports: [
    CommonModule,
    LearningAcademyRoutingModule
  ]
})
export class LearningAcademyModule { }
