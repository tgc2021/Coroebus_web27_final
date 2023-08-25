import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../core/app-state/actions';
import { UserModel } from '@models/user.model';
import { HttpProtocols } from '@app/http/http.protocols';
import { Util } from '@app/utils/util';
import Swal from 'sweetalert2';
import { ApiserviceService } from 'app/apiservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  userid: any;
  showMainContent: Boolean = true;
  page: any;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private readonly store: Store, private Util: Util,public http:ApiserviceService) { }
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: any;
  userid_bh:any
  id_org:any
  id_coroebus_organization_bh:any
  // set the currenr year
  year: number = new Date().getFullYear();
  showHidePwdInput: boolean = false
  isfirstLoginSecurityQuestionEWnable: boolean = false
  isTermsandConditionEnalbe: boolean = false
  async ngOnInit() {

    var href = window.location.href;
    
    var url = new URL(href)
    

    document.body.classList.add('auth-body-bg')
    this.loginForm = this.formBuilder.group({
      userID: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    var checkUserID= this.route.queryParams
    .subscribe(params => {
      
      this.userid = params.userid;
      this.page=params.page;
      localStorage.setItem('page',this.page)
      
    }
  );
    
    if(href.includes('userid')){
      this.showMainContent = false;

      // const userId ="Wide018"
      const userId = this.Util.encryptData(this.userid)
      
      
      // this.Util.encryptData(checkUserID)
      const autologin= "1"
      const body = { "USERID": userId, "autologin": autologin}

      const [err, res] = await HttpProtocols.to(UserModel.authenticationAndAuthorization(body))

      if (!err && res?.status === 'success' && res?.statuscode === 200) {
        localStorage.setItem('status','success')
        // if flag is 1 then consider it's firstLogin for end user
        if (res?.data?.indicator_flag === 1) {
          this.isfirstLoginSecurityQuestionEWnable = true
          // 1. term and condition
          // 2. pwd
          // 3. security question
          if (res?.data?.terms?.id_coroebus_terms_conditions) {
            this.dispatchAndNavigate(res, 'terms-and-conditions')
          } else {
            this.dispatchAndNavigate(res, 'create-new-password')
            //this.router.navigate(['/account/create-new-password']);
          }
        } else {
          if (res?.data?.terms?.id_coroebus_terms_conditions) {
            this.dispatchAndNavigate(res, 'terms-and-conditions')
          } else {
            if (res?.data?.indicator_flag === 0) {
              this.dispatchAndNavigate(res, 'create-new-password')
            } else {
              this.dispatchAndNavigate(res, 'theme')
            }
          }
        }

      } else {
        Swal.fire({
          title: '',
          text: res?.message || res?.data,
          imageUrl: 'assets/images/svg/logo/logo.svg',
          imageHeight: 40,
          confirmButtonColor: '#556ee6'
        });
      }

    }

    // reset login status
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    

    if (this.returnUrl) {
      this.returnUrl = undefined
      // window.location.reload()
    }
    
  }// convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      const password = this.Util.encryptData(this.loginForm.value.password)
      const userId = this.Util.encryptData(this.loginForm.value.userID)
      const body = { "USERID": userId, "PASSWORD": password }
      const [err, res] = await HttpProtocols.to(UserModel.authenticationAndAuthorization(body))
      if (!err && res?.status === 'success' && res?.statuscode === 200) {
        
        
        let body={
          _userid:userId.toString(),
          _game:"na",
          _device:"W",
          _section:"Login",
          _refid: "",
          _description:"Login Successful"
        }

        // {"_userid":"Ek/VOOiJgjEigYASBYAX6A==","_section":"Login","_description":"Login Succesfull","_game":"na","_device":"W","_refid":""}
        
        this.userid_bh=this.Util.decryptData(body._userid)
        localStorage.setItem('userid',this.userid_bh)
        
        this.id_org=res?.data
        
        this.id_coroebus_organization_bh=this.id_org._personal_data.id_coroebus_organization
        localStorage.setItem('id_coroebus_org_bh',this.id_coroebus_organization_bh)
        localStorage.setItem('VideoHide','true');
        
        this.http.engagamentlog(body).subscribe(res=>{
          
          
        })
        // if flag is 1 then consider it's firstLogin for end user
        if (res?.data?.indicator_flag === 1) {
          this.isfirstLoginSecurityQuestionEWnable = true
          // 1. term and condition
          // 2. pwd
          // 3. security question
          if (res?.data?.terms?.id_coroebus_terms_conditions) {
            this.dispatchAndNavigate(res, 'terms-and-conditions')
          } else {
            this.dispatchAndNavigate(res, 'create-new-password')
            //this.router.navigate(['/account/create-new-password']);
          }
        } else {
          if (res?.data?.terms?.id_coroebus_terms_conditions) {
            this.dispatchAndNavigate(res, 'terms-and-conditions')
          } else {
            if (res?.data?.indicator_flag === 0) {
              this.dispatchAndNavigate(res, 'create-new-password')
            } else {
              this.dispatchAndNavigate(res, 'theme')
            }
          }
        }

      } else {
        let body={
          _userid:userId,
          _game:"na",
          _device:"W",
          _section:"Login Failure",
          _description:"Invalid Password"
        }

        this.http.engagamentlog(body).subscribe(res=>{
          
          
        })

        Swal.fire({
          title: '',
          text: res?.message || res?.data,
          imageUrl: 'assets/images/svg/logo/logo.svg',
          imageHeight: 40,
          confirmButtonColor: '#556ee6'
        });
      }
    }
  }
  showHidePwd() {
    this.showHidePwdInput = !this.showHidePwdInput
  }
  firstLoginSecurityQuestion() {

  }
  dispatchAndNavigate(res: any, componentName: any) {
    this.store.dispatch(userActions.login({ user: { ...res?.data } }));
    switch (componentName) {
      case 'theme':
        this.router.navigate(['/account/theme/selection']);
        break;
      case 'create-new-password':
        this.router.navigate(['/account/create-new-password']);
        break;
      default:
        this.router.navigate(['/account/terms-and-conditions']);
        break;
    }
  }
}













