import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningAcademyComponent } from './learning-academy.component';

const routes: Routes = [
{ 
  path: 'learningAcademy', 
  component: LearningAcademyComponent ,
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningAcademyRoutingModule { }
