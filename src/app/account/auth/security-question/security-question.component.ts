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
import { ApiserviceService } from 'app/apiservice.service';


@Component({
  selector: 'app-security-questions',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss']
})
export class SecurityQuestionComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private readonly store: Store, private Util: Util,public http:ApiserviceService) { }
  securityQuestionForm: FormGroup;
  submitted = false;
  // set the currenr year
  year: number = new Date().getFullYear();
  securityQList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  ngOnInit(): void {
    document.body.classList.add('auth-body-bg')
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
    })
    this.store.select(fromRoot.securityQuestion).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.securityQList = data?.securityQuestion
    })
    this.securityQuestionForm = this.formBuilder.group({
      securityQuestion_1: ['', [Validators.required]],
      securityQuestion_1_ans: [null, [Validators.required]],
      securityQuestion_2: ['', [Validators.required]],
      securityQuestion_2_ans: [null, [Validators.required]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.securityQuestionForm.controls; }
  /**
   * Form submit
   */
  async setSecurityQuestion() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.securityQuestionForm.invalid) {
      return;
    } else {
      const body = {
        "userid": this.userObj?._personal_data?.USERID,
        "questions": [
          {
            "id_security_question": this.securityQuestionForm.value?.securityQuestion_1,
            "fp_answer": this.securityQuestionForm.value?.securityQuestion_1_ans
          },
          {
            "id_security_question": this.securityQuestionForm.value?.securityQuestion_2,
            "fp_answer": this.securityQuestionForm.value?.securityQuestion_2_ans
          }
        ]
      }
      console.log(body)
      const [err, res] = await HttpProtocols.to(UserModel.setSecurityQuestion(body))
      if (!err && res?.status === 'success' && res?.statuscode === 200) {
       
        localStorage.clear()
        this.router.navigate(['/account/auth/login']);

        
        // this.router.navigate(['/account/theme/selection']);
      } else {
        Swal.fire({
          title: '',
          text: res?.data || res?.message,
          imageUrl: 'assets/images/svg/logo/logo.svg',
          imageHeight: 40,
          confirmButtonColor: '#556ee6'
        });
      }
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
