import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountRoutingModule } from './account-routing.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    AuthModule
  ]
})
export class AccountModule { }
