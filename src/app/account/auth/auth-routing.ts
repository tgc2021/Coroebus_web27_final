import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';
import { SecurityQuestionComponent } from './security-question/security-question.component';
import { AuthGuard } from '@app/guards/auth.guard';
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
        path: 'reset-password',
        component: PasswordresetComponent,
        data: { animation: 'reset-password' }
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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
