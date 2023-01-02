import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../core/app-state/actions';
import { UserModel } from '@models/user.model';
import { HttpProtocols } from '@app/http/http.protocols';
import { Util } from '@app/utils/util';
import Swal from 'sweetalert2';
import { CustomValidators } from '../custom-validators';
import { RouteFadeAnimation } from '@shared/animations';
import { ApiserviceService } from 'app/apiservice.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
  // animations: [RouteFadeAnimation],
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private readonly store: Store, private Util: Util,public http:ApiserviceService) { }
  resetForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  showPassWordBlock = false;
  // set the currenr year
  year: number = new Date().getFullYear();
  showHidePwdInput: boolean = false
  showSecurityQuestionBlock: boolean = false
  showId:boolean=true
  hideLabel:boolean=true
  showLabelPassword:boolean=false
  securityList: any = []

  ngOnInit(): void {

    let body={
      _userid:'na',
      _game:"na",
      _device:"W",
      _section:"Forget Password",
      _description:"Forget Password"
    }

    this.http.engagamentlog(body).subscribe(res=>{
      console.log(res);
      
    })

    document.body.classList.add('auth-body-bg')
    this.resetForm = this.createResetForm()


    // reset login status
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  createResetForm(): FormGroup {
    return this.formBuilder.group(
      {
        userID: [
          null,
          Validators.compose([Validators.required])
        ],
        password: [
          null,
          {
            validators: [
              Validators.compose([
                Validators.required,
                // check whether the entered password has a number
                CustomValidators.patternValidator(/\d/, {
                  hasNumber: true
                }),
                // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, {
                  hasCapitalCase: true
                }),
                // check whether the entered password has a lower case letter
                CustomValidators.patternValidator(/[a-z]/, {
                  hasSmallCase: true
                }),
                // check whether the entered password has a special character
                CustomValidators.patternValidator(
                  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                  {
                    hasSpecialCharacters: true
                  }
                ),
                Validators.minLength(8)
              ])
            ],
            updateOn: 'change'
          }

        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
        securityQuestion_1: [null, [Validators.required]],
        securityQuestion_2: [null, [Validators.required]],
        securityQuestion_1_Q_ID: [null, []],
        securityQuestion_2_Q_ID: [null, []],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * Form submit
   */

  showHidePwd() {
    this.showHidePwdInput = !this.showHidePwdInput
  }

  async checkUserID() {
    const body = { "userid": this.resetForm?.value?.userID }
    const [err, res] = await HttpProtocols.to(UserModel.checkUserID(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200 && res?.data?.check_status === 'Valid') {
      if (res?.data?.security_questions?.length > 0) {
        this.securityList = res?.data?.security_questions
        this.showSecurityQuestionBlock = true
        this.resetForm.controls['securityQuestion_1_Q_ID'].patchValue(this.securityList?.[0]?.id_security_question)
        this.resetForm.controls['securityQuestion_2_Q_ID'].patchValue(this.securityList?.[1]?.id_security_question)
      } else {
        this.securityList = []
        this.showSecurityQuestionBlock = false
        this.showPassWordBlock = false;
        Swal.fire({
          title: '',
          text: 'You are not able to reset the password, your registration process is incomplete',
          imageUrl: 'assets/images/svg/logo/logo.svg',
          imageHeight: 40,
          confirmButtonColor: '#556ee6'
        });
      }
    } else {
      this.showSecurityQuestionBlock = false
      this.showPassWordBlock = false;
      Swal.fire({
        title: '',
        text: res?.message || 'Credentials entered are invalid',
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    }
    //this.showPassWordBlock = true;
  }
  async checkSecurityAnswer() {
    const body = {
      "userid": this.resetForm?.value?.userID, questions: [
        { "id_security_question": this.resetForm?.value?.securityQuestion_1_Q_ID, "fp_answer": this.resetForm?.value?.securityQuestion_1 },
        { "id_security_question": this.resetForm?.value?.securityQuestion_2_Q_ID, "fp_answer": this.resetForm?.value?.securityQuestion_2 }
      ]
    }
    const [err, res] = await HttpProtocols.to(UserModel.checkSecurityAnswer(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200 && res?.data?.validation_status !== 'failure') {

      let body={
        _userid:this.resetForm?.value?.userID,
        _game:"na",
        _device:"W",
        _section:"Forget Password",
        _description:"Security Question Success"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.showPassWordBlock = true;
      this.showSecurityQuestionBlock = false
      this.showId=false
      this.hideLabel=false
      this.showLabelPassword=true
    } else {

      let body={
        _userid:this.resetForm?.value?.userID,
        _game:"na",
        _device:"W",
        _section:"Forget Password",
        _description:"Security Question Failure"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.showPassWordBlock = false;
      this.resetForm.controls['confirmPassword'].patchValue(null)
      this.resetForm.controls['password'].patchValue(null)
      Swal.fire({
        title: '',
        text: res?.message || 'Security question answer did not match',
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    }
  }
  async changePwd() {
    const password = this.Util.encryptData(this.resetForm.value.password)
    const userId = this.Util.encryptData(this.resetForm.value.userID)
    const body = { "userid": userId, "password": password }
    const [err, res] = await HttpProtocols.to(UserModel.updatePassword(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      let body={
        _userid:this.resetForm?.value?.userID,
        _game:"na",
        _device:"W",
        _section:"Forget Password",
        _description:"Successful Reset"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      Swal.fire({
        icon: 'success',
        text: 'Your password has been updated successfully',
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/account/auth/login']);
        }
      })
    } else {
      Swal.fire({
        title: '',
        text: res?.message,
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    }

  }
}

