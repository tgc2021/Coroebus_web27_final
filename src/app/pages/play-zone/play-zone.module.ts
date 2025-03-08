import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';	
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { PlayZoneRoutingModule } from './play-zone-routing.module';
import { PlayZoneComponent } from './play-zone.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FilterPipePipe } from './pipe/filter-pipe.pipe';

@NgModule({
  declarations: [
    PlayZoneComponent,
    FilterPipePipe
 
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    IvyCarouselModule,
    PlayZoneRoutingModule,
    FormsModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    FormsModule,
    NgbModule,   
  ],

  

})
export class PlayZoneModule { }
