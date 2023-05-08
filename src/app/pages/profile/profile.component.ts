import { CustomValidators } from '@account/auth/custom-validators';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
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
import { ApiserviceService } from 'app/apiservice.service';
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
  dark_color: string;
  medium_color: string;
  light_color: string;
  constructor(public formBuilder: FormBuilder, private readonly store: Store,
    private Util: Util, private modalService: NgbModal, private eventService: EventService, public http:ApiserviceService,public element: ElementRef) { }

  ngOnInit(): void {
        // setTimeout(() => { this.ngOnInit() }, 1000 * 1)
        if (!localStorage.getItem('foo')) { 
          localStorage.setItem('foo', 'no reload') 
          location.reload() 
        } else {
          localStorage.removeItem('foo') 
        }
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
// console.log(this.userObj);

      this.initForm()
      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      // console.log(this.mergeObj);

    })

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
// console.log(this.dark_color);

    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

    this.light_color=localStorage.getItem('light_color')
    this.element.nativeElement.style.setProperty('--lightColor', `${this.light_color}`)

    // console.log(this.medium_color);

    this.ProfileImageNewOne=JSON.parse(localStorage.getItem('Profile'))
    // console.log( this.ProfileImageNewOne);

    let body={
      _userid:this.userObj?._personal_data?.USERID,
      _game:this.userObj?._personal_data?.id_coroebus_game,
      _device:"W",
      _section:"Profile",
      _description:"Profile Page"
    }

    this.http.engagamentlog(body).subscribe(res=>{
      // console.log(res);
      
    })

  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: [{ value: this.userObj?._personal_data?.first_name, disabled: true }, [Validators.required]],
      emailId: [{ value: this.userObj?._personal_data?.email_id, disabled: true }, [Validators.required]],
      contact: [{ value: this.userObj?._personal_data?.contact_number, disabled: true }, [Validators.required]],
      designation: [{ value: this.userObj?._personal_data?.user_designation, disabled: true }, [Validators.required]],
      department: [{ value: this.userObj?._personal_data?.user_department, disabled: true }, [Validators.required]],
      grade: [{ value: this.userObj?._personal_data?.user_grade, disabled: true }, [Validators.required]],
      function: [{ value: this.userObj?._personal_data?.user_function, disabled: true }, [Validators.required]],

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
  
    let body={
      _userid:this.userObj?._personal_data?.USERID,
      _game:this.userObj?._personal_data?.id_coroebus_game,
      _device:"W",
      _section:"Profile",
      _description:"Profile Edit from Profile"
    }

    this.http.engagamentlog(body).subscribe(res=>{
      // console.log(res);
      
    })

    // console.log(fileList)
    if (fileList) {
      const modalRef = this.modalService.open(ImagecropperComponent, { centered: true, windowClass: 'modal-cls' })
      modalRef.componentInstance.fileData = event;
      modalRef.componentInstance.buttonColor = this.userObj?.otherInfo?.color;
      modalRef.componentInstance.userObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo };
      // console.log("FileUpload -> files", fileList);
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

      let body={
        _userid:this.userObj?._personal_data?.USERID,
        _game:this.userObj?._personal_data?.id_coroebus_game,
        _device:"W",
        _section:"Profile",
        _description:"Password Change"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        // console.log(res);
        
      })

      this.eventService.broadcast('callSectionView_1API')
      this.ProfileImageNew=res?.data?._personal_data?.profile_logo
      // console.log(this.ProfileImageNew);
      
      Swal.fire({
        title: '',
        text: res?.message,
        // imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: this.userObj?.otherInfo?.color != null? this.userObj?.otherInfo?.color :  this.dark_color
      }).then((result) => {
        if(res?.data?._personal_data?.id_role==13){
          this.Util.goto('/topdashboard')
        }else if(res?.data?._personal_data?.id_role==9|| res?.data?._personal_data?.id_role==8){
          this.Util.goto('/top_dashboard')

        }
        else{
          this.Util.goto('/account/interactive-dashboard')

        }
        // console.log(result);
        
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
