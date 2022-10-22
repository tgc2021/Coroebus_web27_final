import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { Subject } from 'rxjs';
import { Util } from '@app/utils/util';
import { takeUntil } from 'rxjs/operators';
import { NgbModalConfig,NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-play-zone',
  templateUrl: './play-zone.component.html',
  styleUrls: ['./play-zone.component.scss']
})
export class PlayZoneComponent implements OnInit {
  userObj: import("d:/TGC work/Coroebus_web27_final/src/app/core/app-state/entity/user.entity").User;
  filteredData: any;
  hideDropDown: any;
  update_spot_status: any;
  newArray: any;
  hideMobileDropDown: boolean;
  PerformanceType: any;
  EngagementMentType: any;
  filterPerformanceData: string;
  id: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  spotEngagementData;
  spotEngagementPassbook:any;
  mergeObj: any;
  cardDisabled:boolean=false;
  status: any;
  i:any;
  rewardPoints: any=0;
  term:any;
  term1:any;
  spot_type:any='';
  updateStatus:any=[];
  order: string = '';
  PerformanceArray:any=[];
  openEvents:boolean=true;
  openPassBook:boolean;
  filterByCategory: any;
  Passbook: any;
  Ascending: boolean=true;
  Descending:boolean;

  constructor(private http: ApiserviceService, private readonly store: Store, private modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
   
    private _route: ActivatedRoute, public toastService: ToastService,config: NgbModalConfig,obj: NgbDropdownConfig) { 
      config.backdrop = true;
      config.keyboard = false;
      config.centered= true;
      obj.autoClose=true;
    }
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
      console.log(res);

      this.spotEngagementData=res.data._spot_engagement_data;
      this.filterByCategory=res.data._spot_engagement_data;
      });

      
      //  console.log(this.spotEngagementData);
      this.http.playZonePassbook(body).subscribe((res:any)=>{
        console.log(res);
        this.rewardPoints=res.data._reward_points;
       
        
        console.log(this.rewardPoints);
        this.spotEngagementPassbook=res.data._spot_passbook_data;
        this.Passbook=res.data._spot_passbook_data;
        console.log(this.spotEngagementPassbook);
       
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

  filter(category:any){

    this.filterByCategory=this.spotEngagementData
    .filter((a:any)=>{
      if(a.spot_type==category || category=='')
      return a;
    })
  }

checked:boolean=false;


  filterPassBook(category:any){
    this.checked=!this.checked;
    if(this.checked==true){
      this.Passbook=this.spotEngagementPassbook.filter((a:any)=>{
        if(a.spot_type===category||category==''){

          return a;
        }
        console.log(this.checked);
    })
    }
    else{
      this.Passbook=this.spotEngagementPassbook.filter((a:any)=>{
          return a;
    })
    }
  }

  filterByPointsAsc(){
    this.Passbook = this.spotEngagementPassbook.sort((a, b) => b.reward_point - a.reward_point);  
   console.log("Asc order",this.Passbook)
   this.Ascending=true;
   this.Descending=false;
  }
  filterByPointsDsc(){
    this.Passbook = this.spotEngagementPassbook.sort((a, b) => a.reward_point - b.reward_point);
    this.Descending=true;
    this.Ascending=false;
   
    console.log("DSC order",this.Passbook)
  }
  value = '2';
  clearText(){
    this.term1="";
    this.term="";
  }

key = 'date_time_stamp';  

reverse = false;
  sortList(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
openEvent(){

  this.openEvents=true;
  this.openPassBook=false;
}

rewardPassBook(){
  this.openEvents=false;
  this.openPassBook=true;
}

}