import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../core/app-state/actions';
import { UserModel } from '@models/user.model';
import { HttpProtocols } from '@app/http/http.protocols';
import { Util } from '@app/utils/util';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../../core/app-state';
import { Subject } from 'rxjs';
import { formatDate } from '@angular/common';
import { ApiserviceService } from 'app/apiservice.service';
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private readonly store: Store, private Util: Util,public http:ApiserviceService) { }
  termsAndConditionsForm: FormGroup;
  submitted = false;
  // set the currenr year
  year: number = new Date().getFullYear();
  showHidePwdInput: boolean = false
  isfirstLoginSecurityQuestionEWnable: boolean = false
  isTermsandConditionEnalbe: boolean = false
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  ngOnInit(): void {
    document.body.classList.add('auth-body-bg')
    this.termsAndConditionsForm = this.formBuilder.group({
      terms_and_conditions: [false, [Validators.required]],
    });
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      if (!this.userObj?.terms?.id_coroebus_terms_conditions) {
        this.router.navigate(['/account/theme/selection']);
      }
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.termsAndConditionsForm.controls; }

  /**
   * Form submit
   */
  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.termsAndConditionsForm.invalid) {
      return;
    } else {
      const body = { _userid: this.userObj?._personal_data?.USERID, "_termsid": this.userObj?.terms?.id_coroebus_terms_conditions, _datetime: formatDate(Date.now(), 'd-M-y H:mm:ss', 'en-US') }
      
      const [err, res] = await HttpProtocols.to(UserModel.acceptTerms(body))
      if (!err && res?.status === 'success' && res?.statuscode === 200) {
        let body={
          _userid:this.userObj?._personal_data?.USERID,
          _game:"na",
          _device:"W",
          _section:"Terms and Conditions",
          _description:"Accepted"
        }
    
        this.http.engagamentlog(body).subscribe(res=>{
          
          
        })
  
        this.dispatchAndNavigate(res)
      } else {
        let body={
          _userid:this.userObj?._personal_data?.USERID,
          _game:"na",
          _device:"W",
          _section:"Terms and Conditions",
          _description:"Rejected"
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
  dispatchAndNavigate(res: any) {
    //this.store.dispatch(userActions.login({ user: { ...res?.data } }));
    this.router.navigate(['/account/create-new-password']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  checkValue(event: any) {
    //
  }
}
