import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { EventService } from '@app/services/event.service';
import { ProfileModel } from '@models/profile.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Util } from '@app/utils/util';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import Swal from 'sweetalert2';
import * as fromRoot from '../../core/app-state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApiserviceService } from 'app/apiservice.service';

@Component({
  selector: 'app-imagecropper',
  templateUrl: './imagecropper.component.html',
  styleUrls: ['./imagecropper.component.scss']
})

/**
 * UI-Image-cropper component
 */
export class ImagecropperComponent implements OnInit {

  @Input() fileData: any
  @Input() buttonColor: any
  @Input() userObj: any
  
  ProfileImageNew1: any=null;
  crop: Subscription
  dark_color: any;
  medium_color: any;
  light_color: any;


  constructor(public activeModal: NgbActiveModal, private readonly store: Store, private eventService: EventService,private Util: Util, public http:ApiserviceService,public element: ElementRef) { }
  croppedImage: any = '';
  error: any
  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

  ngOnInit(): void {
    console.log(this.fileData)

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
console.log(this.dark_color);

    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

    this.light_color=localStorage.getItem('light_color')
    this.element.nativeElement.style.setProperty('--lightColor', `${this.light_color}`)

    console.log(this.medium_color);
  }

  /**
   * Crop image
   * @param event image passed
   */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  // refresh(){
  //   this.userObj
  //   console.log(this.userObj);
    
  //   this.store.select(fromRoot.userLogin).pipe(
  //   ).subscribe(data => {
  //     this.userObj = data?.user
  //   })
    
  // }
  async cropAndSave() {
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": this.userObj?.USERID,
      "_cdorganization": this.userObj?.cd_coroebus_organization,
      "_cduser": this.userObj?.cd_coroebus_user,
      "_iduser": this.userObj?.id_coroebus_user,
      "_team": this.userObj?.id_coroebus_team || 0,
      "_game": this.userObj?.id_coroebus_game || 0,
      "updated": {
        "profile_logo": this.croppedImage,
        "first_name": this.userObj?.first_name,
      },
    };
    [err, res] = await HttpProtocols.to(ProfileModel.updateProfilePic(body))
    console.log(body)
    if (!err && res?.statuscode === 200) {
      let body={
        _userid:this.userObj?._personal_data?.USERID,
        _game:"na",
        _device:"W",
        _section:"Profile",
        _description:"Edit Profile"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.ProfileImageNew1=res?.data?._personal_data?.profile_logo
      console.log(this.ProfileImageNew1);
      localStorage.setItem('Profile',JSON.stringify(this.ProfileImageNew1))
      this.eventService.broadcast('callSectionView_1API')

  
      this.activeModal.close(); //It closes successfully
      
      Swal.fire({
        title: '',
        text: res?.message,
        imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      }).then((result) => {
          window.location.reload()
         
      })
    } else {
      this.error = 'Error while saving images'
    }
  }

  close() {
    
    this.activeModal.close();
    location.reload()
  }


}
