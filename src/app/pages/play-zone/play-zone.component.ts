import { Component, OnInit,Input } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { Subject } from 'rxjs';
import { Util } from '@app/utils/util';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { NgbModalConfig,NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-play-zone',
  templateUrl: './play-zone.component.html',
  styleUrls: ['./play-zone.component.scss']
})
export class PlayZoneComponent implements OnInit {

  userObj:any;
  // userObj: import("").User;
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
  spinTheWheelURL: string;
  combineLatest: Subscription
  userSelectionData: { games?: any; is_heart_points?: any; kpi_name?: any; _personal_data?: any; id_coroebus_game?: any; id_coroebus_theme?: any; coroebus_theme_title?: string; theme_description?: string; logo?: string; theme_label?: string; role_3_label?: string; role_4_label?: string; role_6_label?: string; role_8_label?: string; role_9_label?: string; theme_background?: string; player_label?: string; target_icon?: string; userID?: string; olympic_logo?: string; indicator_flag?: number; theme_flag?: number; terms?: string; is_spectator?: number; is_learningAcademy?: number; is_champions_league?: string; is_personal_challenge?: string; is_fantasy_league?: string; is_seasonal_theme?: string; security_questions?: string; themes?: any; _access_token?: string; _system?: any; otherInfo?: any; };
  passDataToHeaderSub: any;
  headerInfo: any;
  color: any;
  bgImage: any;
  element: any;
  _routeSub: Subscription;
  queryParams: any;
  Url: URL;
  safeUrl: SafeResourceUrl;
  dartGameUrl: string;
  skylineGameUrl: string;
  spinTheWheel: string;
  cubeBlasters: string;
  cubicallUrl: string;
  dark_color: string;
  medium_color: string;
  light_color: string;
  cubeBlastersUrl: string;
  id_role: any;
  tgcToolBoxUrl: string;

  constructor(private http: ApiserviceService, private readonly store: Store, public modalService: NgbModal,
    public Util: Util, private eventService: EventService, private _router: Router,
   
    private _route: ActivatedRoute, public toastService: ToastService,config: NgbModalConfig,obj: NgbDropdownConfig, public sanitizer: DomSanitizer ,public _location:Location) { 
      config.backdrop = true;
      config.keyboard = true;
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

      this.id_role=this.mergeObj.id_role;
      console.log(this.id_role);

      
      this.playZone();
      this.rewardPassbook();
     
     
    }) 

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
console.log(this.dark_color);

    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

    this.light_color=localStorage.getItem('light_color')
    this.element.nativeElement.style.setProperty('--lightColor', `${this.light_color}`)

    this.dynamicColor()
  }

  playZone(){
    console.log(this.mergeObj)
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj.id_coroebus_game,
    }


    console.log(body);
   
    this.http.playZone(body).subscribe((res:any) => {
    console.log(res);


    this.spotEngagementData=res.data._spot_engagement_data;
    
    console.log(this.spotEngagementData);
    this.filterByCategory=res.data._spot_engagement_data;
    });
  }
  rewardPassbook(){
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj.id_coroebus_game,
    }

    this.http.playZonePassbook(body).subscribe((res:any)=>{
      console.log(res);
      this.rewardPoints=res.data._reward_points;
      console.log(this.rewardPoints);
      this.spotEngagementPassbook=res.data._spot_passbook_data;
      this.Passbook=res.data._spot_passbook_data;
      console.log(this.spotEngagementPassbook);
  
    })

  }
  open(content,data) {
    // console.log(content);
    if(data.id_engagement_game==='1'){
      console.log(data)
      // this.dartGameUrl=`http://127.0.0.1:5501/index.html?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      console.log(this.dartGameUrl);
       this.dartGameUrl=`https://coroebus.in/dart_game/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`;
      // this.dartGameUrl=`http://127.0.0.1:5501/index.html?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`;
      this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.dartGameUrl);
      this.modalService.open(content);
    }
    else if(data.id_engagement_game==='2'){
     
      this.spinTheWheelURL=`https://coroebus.in/spin_the_wheel/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      // this.spinTheWheelURL=`http://127.0.0.1:5502/spin_the_wheel_latest/index.html?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.spinTheWheelURL)
      this.modalService.open(content,{size: 'lg'});
    }
    else if(data.id_engagement_game==='5'){
      this.skylineGameUrl=`https://coroebus.in/CoroebusSkyline/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`

      // this.skylineGameUrl=`https://coroebusbeta.in/CoroebusSkyline/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      // this.skylineGameUrl=`http://127.0.0.1:5500/MiniGame_cube_Busters/index.html?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.skylineGameUrl)
      console.log(this.skylineGameUrl);
      this.modalService.open(content,{size: 'lg'});
    }
    else if(data.id_engagement_game==='6'){
      this.cubeBlasters=`https://coroebus.in/cube_blasters/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      console.log(this.cubeBlastersUrl);
      // this.cubeBlasters=`http://127.0.0.1:5500/MiniGame_cube_Busters/index.html?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`
      this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.cubeBlasters);
      
      this.modalService.open(content,{size: 'xl'});
    }
  }

  // By Default 

  openSpinTheWheels(content){

    // this.spinTheWheelURL=`https://coroebusbeta.in/spin_the_wheel/`
    this.spinTheWheelURL=`https://coroebusbeta.in/spin_the_wheel/?_userid=Cannon014&id_spot_engagement=126&id_spot_event_setup=248&id_engagement_game=2&id_spot_stw_log=2301&_game=318`
      this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.spinTheWheelURL);
      this.modalService.open(content,{size: 'lg'});
  }

  openCubeBlasters(content){
    this.cubeBlastersUrl=`https://coroebusbeta.in/cube_blasters/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.cubeBlastersUrl)
    this.modalService.open(content,{size: 'lg'});


  }
  openCubicall(content){
    this.cubicallUrl=`https://www.playtolearn.in/cubi-call/?UserLogin_Id=${this.mergeObj.USERID}&Name=${this.mergeObj.first_name}&IdOrganization=${this.mergeObj.id_coroebus_organization}`
    console.log(this.cubicallUrl)
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.cubicallUrl);
    this.modalService.open(content,{size: 'lg'});

  }
  openDartGame(content){
    this.dartGameUrl=`https://coroebusbeta.in/dart_game/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.dartGameUrl)
    this.modalService.open(content);
  }
  openSkyline(content){
    this.skylineGameUrl=`https://coroebusbeta.in/CoroebusSkyline/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.skylineGameUrl)

    this.modalService.open(content,{size: 'lg'});

  }

  openTGCToolBox(content){
    this.tgcToolBoxUrl=`https://coroebus.in/TGCToolbox/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.tgcToolBoxUrl)

    this.modalService.open(content,{size: 'xl'});

  }
 

  // open(content) {
  //   this.modalService.open(content);
  // }

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
dismiss(){

  window.location.reload();
 
}

dynamicColor() {
  // $('#example').DataTable();
 

  this.combineLatest = combineLatest([
    this.store.select(fromRoot.userLogin),
    this.store.select(fromRoot.usertheme),
    this.store.select(fromRoot.usergame),
  ]
  ).subscribe(([login, theme, game]) => {
    this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
console.log(this.userSelectionData);

  })
  this.passDataToHeaderSub?.unsubscribe()
  this.passDataToHeaderSub = this.eventService.subscribe('passDataToHeader', (data) => {
    this.headerInfo = data
    console.log(this.headerInfo);

  })
  if (this.userSelectionData?.otherInfo) {
    this.headerInfo = this.userSelectionData?.otherInfo
    console.log(this.headerInfo);
    this.color = this.headerInfo.color; //yellowcolor
    console.log(this.color);
    this.bgImage= this.userSelectionData?.themes[0].theme_background_web
    console.log(this.bgImage);
    
    this.element.nativeElement.style.setProperty('--myvar', `${this.color}`)
    this.element.nativeElement.style.setProperty('--bgImage', `${this.bgImage}`)

    // this.element.nativeElement.style.setProperty('--mycolor',`${this.color}`)
    // console.log( this.element.nativeElement.style.setProperty('--myvar',`${this.color}`));


  }
  this._routeSub = this._route.queryParams.subscribe(queryParams => {
    this.queryParams = queryParams
    console.log(queryParams)
  })
}

navigateToCubicalls(){

    window.open(
      //  'http://coroebusbeta.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,

      // 'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
      // '_self' // <- This is what makes it open in a new window.

      'https://www.playtolearn.in/cubi-call/','_self'
     
   

    

  )
}
navigateToToolBox(){

  window.open()




}



}