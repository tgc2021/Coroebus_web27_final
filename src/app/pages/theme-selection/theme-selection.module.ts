import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeSelectionRoutingModule } from './theme-selection-routing.module';
import { ThemeSelectionComponent } from './theme-selection.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '@layouts/footer/footer.component';
import { UIModule } from '@shared/ui/ui.module';

@NgModule({
  declarations: [
    ThemeSelectionComponent
  ],
  imports: [
    CommonModule,
    ThemeSelectionRoutingModule,
    FormsModule
  ]
})
export class ThemeSelectionModule { }
