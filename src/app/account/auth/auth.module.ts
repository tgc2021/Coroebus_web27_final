import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { InteractiveDashboardComponent } from './interactive-dashboard/interactive-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import { TableauModule } from 'ngx-tableau';
import { GrowthReportComponent } from './growth-report/growth-report.component';
import { GovernanceReportComponent } from './governance-report/governance-report.component';
import { ShortNumberPipe } from './short-number.pipe';


@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordresetComponent, TermsAndConditionsComponent, CreateNewPasswordComponent, SecurityQuestionComponent, InteractiveDashboardComponent, LoaderComponent, BusinessReportComponent, GrowthReportComponent, GovernanceReportComponent, ShortNumberPipe],
  providers:[],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    MatCardModule,
    NgbProgressbarModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    TableauModule
  ]
})
export class AuthModule { }