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
import { TvsDashboardComponent } from './tvs-dashboard/tvs-dashboard.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordresetComponent, TermsAndConditionsComponent, CreateNewPasswordComponent, SecurityQuestionComponent, TvsDashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule
  ]
})
export class AuthModule { }