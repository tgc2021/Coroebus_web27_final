import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../../core/app-state';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.scss'],
  // animations: [RouteFadeAnimation]
})
export class CreateNewPasswordComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private readonly store: Store, private Util: Util) { }
  newPwdForm: FormGroup;
  submitted = false;
  getValueCurrentPassword="";
  getValueConfirmPassword="";
  // set the currenr year
  year: number = new Date().getFullYear();
  showHidePwdInput: boolean = false
  showHideCPwdInput: boolean = false
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  currentPwdErr: boolean = false
  comparePassErr:boolean=false
  ngOnInit(): void {
    document.body.classList.add('auth-body-bg')
    this.newPwdForm = this.createPasswordForm()
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      // if (this.userObj?.indicator_flag !== 1) {
      //   this.router.navigate(['/account/theme/selection']);
      // }
    })
  }
  createPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        currentPassword: [
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
                // CustomValidators.patternValidator(//, {
                //   comparePassword: true
                // }),
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
          },
        ],
     
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
        Validator: CustomValidators.passwordMatchValidator
        // Validator:CustomValidators.currentPassAndNewPassMatchValidator,
      }
      , 
    
    );
  }
  // convenience getter for easy access to form fields
  get f() { return this.newPwdForm.controls; }

  /**
   * Form submit
   */

  showHidePwd() {
    this.showHidePwdInput = !this.showHidePwdInput
  }
  showHideCPwd() {
    this.showHideCPwdInput = !this.showHideCPwdInput
  }
  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newPwdForm.invalid) {
      
      return;
    } else {
      
      
      
      
    
      if (this.Util.encryptData(this.newPwdForm.value.currentPassword) === this.userObj?._personal_data?.password) {

        this.currentPwdErr = false
        this.comparePassErr=false
        const password = this.Util.encryptData(this.newPwdForm.value.password)
        const currentPasswordData=this.Util.encryptData(this.newPwdForm.value.currentPassword)
        const userId = this.Util.encryptData(this.userObj?._personal_data?.USERID)
        const body = { "userid": userId, "password": password }
        const [err, res] = await HttpProtocols.to(UserModel.updatePassword(body))
        if (!err && res?.status === 'success' && res?.statuscode === 200) {
          // if(currentPasswordData===password){
          //     
          //     Swal.fire({
          //       title: '',
          //       text:'Current Password and new Password should be same' ,
          //       imageUrl: 'assets/images/svg/logo/logo.svg',
          //       imageHeight: 40,
          //       confirmButtonColor: '#556ee6'
          //     }).then(res=>{
          //       this.router.navigate(['/account/create-new-password']);
          //       this.newPwdForm.reset()
          //     })

          //  }
         if (res?.data?.security_questions?.questionSet1?.length > 0) {
            this.store.dispatch(userActions.securityQuestion({ securityQuestion: { ...res?.data?.security_questions } }));
            setTimeout(() => {
              this.router.navigate(['/account/security-question']);
            }, 300);
          }
        } else {
          Swal.fire({
            title: '',
            text: res?.data || res?.message ,
            imageUrl: 'assets/images/svg/logo/logo.svg',
            imageHeight: 40,
            confirmButtonColor: '#556ee6'
          });
        }
      } 
      else {
        this.currentPwdErr = true
        this.comparePassErr=true
      }
      // 
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

