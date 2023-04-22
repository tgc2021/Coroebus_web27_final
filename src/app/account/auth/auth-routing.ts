import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { TvsDashboardComponent } from './tvs-dashboard/tvs-dashboard.component';
import { InteractiveDashboardComponent } from './interactive-dashboard/interactive-dashboard.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import { GrowthReportComponent } from './growth-report/growth-report.component';
import { GovernanceReportComponent } from './governance-report/governance-report.component';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'login' }
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'tvs',
        component: TvsDashboardComponent,
    },
    
    {
        path: 'reset-password',
        component: PasswordresetComponent,
        data: { animation: 'reset-password' }
    },
    {
        path: 'business-report',
        component: BusinessReportComponent
       
    },
    {
        path: 'growth_report',
        component: GrowthReportComponent
       
    },
    {
        path: 'governance_report',
        component: GovernanceReportComponent
       
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent,
        data: { animation: 'terms-and-conditions' },
        canActivate: [AuthGuard]
    },
    {
        path: 'create-new-password',
        component: CreateNewPasswordComponent,
        data: { animation: 'create-new-password' },
        canActivate: [AuthGuard]
    },
    {
        path: 'security-question',
        component: SecurityQuestionComponent,
        data: { animation: 'security-question' },
        canActivate: [AuthGuard]
    },
    {
        path: 'interactive-dashboard',
        component: InteractiveDashboardComponent,
        data: { animation: 'interactive-dashboard' },
        canActivate: [AuthGuard]

    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
