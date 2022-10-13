import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';

import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';

import { ToastService } from '@app/services/toast-service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Util } from '@app/utils/util';
import { takeUntil } from 'rxjs/operators';
import { NgbModalConfig,NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-play-zone',
  templateUrl: './play-zone.component.html',
  styleUrls: ['./play-zone.component.scss']
})
export class PlayZoneComponent implements OnInit {
  userObj: any;
  filteredData: any;
  hideDropDown: any;
  update_spot_status: any;
  newArray: any;
  hideMobileDropDown: boolean;
  PerformanceType: any;
  EngagementMentType: any;


  
  constructor(private http: ApiserviceService, private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
   
    private _route: ActivatedRoute, public toastService: ToastService,config: NgbModalConfig,obj: NgbDropdownConfig) { 
      config.backdrop = true;
      config.keyboard = false;
      config.centered= true;
      // obj.autoClose=false;
    }
   id: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  spotEngagementData;
  spotEngagementPassbook:any;
  mergeObj: any;
  cardDisabled:boolean=false;
  status: any;
  i:any;
  rewardPoints: any=0;
  term:any="";
  term1:any="";
  spot_type:any='';
  updateStatus:any=[];
  


  ngOnInit(): void {

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      console.log(this.userObj);

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      console.log(this.mergeObj);

      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.mergeObj.id_coroebus_game,
      }

      console.log(body);
      this.http.playZone(body).subscribe((res:any) => {
        //console.table(res);
        this.spotEngagementData=res.data._spot_engagement_data;
        console.log(this.spotEngagementData);
        this.PerformanceType = this.spotEngagementData.filter(value => value.spot_type==='Performance');
        this.EngagementMentType=this.spotEngagementData.filter(value=>value.spot_type==='Engagement');
        

        console.log(this.PerformanceType);
        console.log(this.EngagementMentType);

      });
      //  console.log(this.spotEngagementData);
      this.http.playZonePassbook(body).subscribe((res:any)=>{
        console.log(res);
        this.rewardPoints=res.data._reward_points;
        console.log(this.rewardPoints);
        this.spotEngagementPassbook=res.data._spot_passbook_data;
       
      })

      
      

      console.log()
      this.http.playZoneUpdate(body).subscribe((res:any)=>{
        console.log(res);
        let id;
        this.update_spot_status=res.data._spot_engagement_data;
        console.log(this.update_spot_status);
        
      })
   
    }) 
    
  }
  
  
  open(content) {
    this.modalService.open(content);
  }

  openDropdown(){
    this.hideDropDown=!this.hideDropDown;
    this.hideMobileDropDown=!this.hideMobileDropDown;
  }

  value = '2';

  onChange(event) {
    this.value = event.target.value;
    console.log(this.value);

  }

  // async spectSearch() {
  //   let err: any, res: any;
  //   let body: any;
  //   // this.spectSearchStrTrigger = true

  //   if (this.spectSearchStr) {
  //     this.spectSearchStrTrigger = true
  //   } else {
  //     this.spectSearchStrTrigger = false
  //   }
  //   body = {
  //     "_userid": this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
  //     "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game,
  //     "page_number": this.pageNumberForSectionView_3,
  //     "_uname": this.spectSearchStr,
  //     "_order": this.activeTabOrderNumberForSectionView_2
  //   };
  //   [err, res] = await HttpProtocols.to(DashboardModel.spectSearch(body))
  //   if (!err && res?.statuscode === 200) {
  //     this.spectSearList = res?.data
  //     console.log(this.spectSearList);

  //   } else {
  //     this.notificationList_err = 'Error'
  //   }
  // }
  
  
  

}
