import { CustomValidators } from '@account/auth/custom-validators';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpProtocols } from '@app/http/http.protocols';
import { EventService } from '@app/services/event.service';
import { Util } from '@app/utils/util';
import { ProfileModel } from '@models/profile.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ImagecropperComponent } from '@pages/imagecropper/imagecropper.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../core/app-state';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  submit: boolean;
  userObj: any
  destroy$: Subject<boolean> = new Subject<boolean>();
  showHidePwdInput: boolean = false
  showHideCPwdInput: boolean = false
  error: any
  mergeObj: any
  ProfileImageNew:any=null
  ProfileImageNewOne:any=null
  @Input() name
  constructor(public formBuilder: FormBuilder, private readonly store: Store,
    private Util: Util, private modalService: NgbModal, private eventService: EventService) { }

  ngOnInit(): void {
        // setTimeout(() => { this.ngOnInit() }, 1000 * 1)

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      this.initForm()
      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
    })
    this.ProfileImageNewOne=JSON.parse(localStorage.getItem('Profile'))
    console.log( this.ProfileImageNewOne);
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: [{ value: this.userObj?._personal_data?.first_name, disabled: true }, [Validators.required]],
      emailId: [{ value: this.userObj?._personal_data?.email_id, disabled: true }, [Validators.required]],
      contact: [{ value: this.userObj?._personal_data?.contact_number, disabled: true }, [Validators.required]],
      currentPassword: [{ value: this.Util.decryptData(this.userObj?._personal_data?.password), disabled: true }, [Validators.required]],
      password: [null, {
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
      }],
      confirmPassword: [null, Validators.compose([Validators.required])]
    }, {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });
  }
  openFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
  
    console.log(fileList)
    if (fileList) {
      const modalRef = this.modalService.open(ImagecropperComponent, { centered: true, windowClass: 'modal-cls' })
      modalRef.componentInstance.fileData = event;
      modalRef.componentInstance.buttonColor = this.userObj?.otherInfo?.color;
      modalRef.componentInstance.userObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo };
      console.log("FileUpload -> files", fileList);
    }
   

  }
  /**
  * Returns form
  */
  get form() {
    return this.userForm.controls;
  }
  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
  showHidePwd() {
    this.showHidePwdInput = !this.showHidePwdInput
  }
  showHideCPwd() {
    this.showHideCPwdInput = !this.showHideCPwdInput
  }
  async updateInfo() {
    // setTimeout(() => { this.updateInfo() }, 1000 * 1)
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": this.mergeObj?.USERID,
      "_cdorganization": this.mergeObj?.cd_coroebus_organization,
      "_cduser": this.mergeObj?.cd_coroebus_user,
      "_iduser": this.mergeObj?.id_coroebus_user,
      "_team": this.mergeObj?.id_coroebus_team || 0,
      "_game": this.mergeObj?.id_coroebus_game || 0,
      "updated": {
        "password": this.Util.encryptData(this.userForm.value.password),
        "first_name": this.mergeObj?.first_name,
      },
    };
    [err, res] = await HttpProtocols.to(ProfileModel.updateProfilePic(body))
    //console.log(body)
    if (!err && res?.statuscode === 200) {
      this.eventService.broadcast('callSectionView_1API')
      this.ProfileImageNew=res?.data?._personal_data?.profile_logo
      console.log(this.ProfileImageNew);
      
      Swal.fire({
        title: '',
        text: res?.message,
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      }).then((result) => {
        this.Util.goto('/dashboard')
        console.log(result);
        
      })
    } else {
      this.error = 'Error while saving data'
    }
  }
re(){
  console.log(this.eventService.broadcast('crop')
  );
  

}

}
