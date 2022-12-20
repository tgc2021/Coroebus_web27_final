import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpectatorViewRoutingModule } from './spectator-view-routing.module';
import { SpectatorViewComponent } from './spectator-view.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    SpectatorViewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgbDropdownModule,
    MatCardModule,
    MatSnackBarModule,
    SpectatorViewRoutingModule,
  ]
})
export class SpectatorViewModule { }
