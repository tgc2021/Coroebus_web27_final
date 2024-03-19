import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'app/apiservice.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../core/app-state';
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
  selector: 'app-new-playzone',
  templateUrl: './new-playzone.component.html',
  styleUrls: ['./new-playzone.component.scss']
})
export class NewPlayzoneComponent implements OnInit {

  userObj:any;
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
  spotEngagementData:any;

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
  searchFromReward:any;
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
  pageInfo: any;
  searchSpotData:any='';
  urlPage: string;
  content: any;
  openCarRacingGameUrl: string;
  openWhackaMoleGameUrl: string;
  openZapTheAlienGameUrl: string;
  openAppleKingGameUrl: string;
  appleKing: string;
  carRacing: string;
  whackaMole: string;
  zapTheAlien: string;

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
      

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      

      this.id_role=this.mergeObj.id_role;
      this.playZone();
      this.rewardPassbook();
     
     
    }) 

    this.dark_color=localStorage.getItem('topbar_color')
    this.element?.nativeElement?.style.setProperty('--myvar', `${this.dark_color}`)


    this.medium_color=localStorage.getItem('medium_color')
    this.element?.nativeElement?.style.setProperty('--mediumColor', `${this.medium_color}`)

    this.light_color=localStorage.getItem('light_color')
    this.element?.nativeElement?.style.setProperty('--lightColor', `${this.light_color}`)

    this.dynamicColor();
     // Changes For M2OST Redirections
    
    //  this.urlPage = localStorage.getItem('page');
    //  if(this.pageInfo!="undefined"){
    //    setTimeout(()=>{
    //      this.checkAndReloadPage()
 
    //    },2000)
      
 
    //  }
  }
  // checkAndReloadPage() {
    
  //   setTimeout(() => {
  //     if (!localStorage.getItem('foo')) {
  //       localStorage.setItem('foo', 'no reload');
  //       location.reload();
  //     } else {
  //       localStorage.removeItem('foo');
  //     }
  //   }, 2000);
  // }
  playZone(){
    
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj.id_coroebus_game,
    }
    this.http.playZone(body).subscribe((res:any) => {
    this.spotEngagementData=res?.data?._spot_engagement_data;
    this.filterByCategory=res?.data?._spot_engagement_data;
    });
  }
  rewardPassbook(){
    let body = {
      _userid: this.mergeObj.USERID,
      _game: this.mergeObj.id_coroebus_game,
    }

    this.http.playZonePassbook(body).subscribe((res:any)=>{
      
      this.rewardPoints=res?.data?._reward_points;
      
      this.spotEngagementPassbook=res?.data?._spot_passbook_data;
      this.Passbook=res?.data?._spot_passbook_data;
      
  
    })

  }
  open(content, data) {

    let gameUrl: string;
    let size: 'lg' | 'xl';
  
    switch (data?.id_engagement_game) {
      case '1':
        gameUrl=`https://coroebus.in/dart_game/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`;
        size = 'xl';
        break;
  
      case '2':
        gameUrl = `https://coroebus.in/spin_the_wheel/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`;
        size = 'lg';
        break;
  
      case '5':
        gameUrl = `https://coroebus.in/CoroebusSkyline/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`;
        size = 'lg';
        break;
  
      case '6':
        gameUrl = `https://coroebus.in/cube_blasters/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}`;
        size = 'xl';
        break;
  
    
  
      case '7':
        gameUrl = `https://www.playtolearn.in/Car-Racer-Minigame/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}&source=Coroebus`;
        size = 'xl';
        break;
  
      case '8':
        gameUrl = `https://www.playtolearn.in/Whack-a-mole-Minigame-prod/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}&source=Coroebus`;
        size = 'xl';
        break;
  
      case '9':
        gameUrl = `https://www.playtolearn.in/ZapTheAlienMinigame/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}&source=Coroebus`;
        size = 'xl';
        break;
      
        case '10':
        gameUrl = `https://www.playtolearn.in/AppleKing-minigame/?_userid=${this.mergeObj.USERID}&id_spot_engagement=${data.id_spot_engagement}&id_spot_event_setup=${data.id_spot_event_setup}&id_engagement_game=${data.id_engagement_game}&id_spot_stw_log=${data.id_spot_stw_log}&_game=${this.mergeObj.id_coroebus_game}&source=Coroebus`;
        size = 'xl';
        break;
  
      default:
        return;
    }
    console.log(gameUrl);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(gameUrl);
    this.modalService.open(content, { size });
  }
  

// By Defaults Games For ABOVE

  openCubeBlasters(content){
    this.cubeBlastersUrl=`https://coroebusbeta.in/cube_blasters/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.cubeBlastersUrl)
    this.modalService.open(content,{size: 'lg'});
  }
  openDartGame(content){
    this.dartGameUrl=`https://coroebus.in/dart_game/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.dartGameUrl)
    this.modalService.open(content);
  }
  openSkyline(content){
    this.skylineGameUrl=`https://coroebus.in/CoroebusSkyline/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.skylineGameUrl)

    this.modalService.open(content,{size: 'lg'});

  }
  openCarRacing(content){
    this.openCarRacingGameUrl=`https://www.playtolearn.in/Car-Racer-Minigame/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.openCarRacingGameUrl);
    this.modalService.open(content,{size: 'lg'});
  }
  openWhackaMole(content){
    this.openWhackaMoleGameUrl=`https://www.playtolearn.in/Whack-a-mole-Minigame-prod/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.openWhackaMoleGameUrl);
    this.modalService.open(content,{size: 'lg'});
  }
  openZapTheAlien(content){
    this.openZapTheAlienGameUrl=`https://www.playtolearn.in/ZapTheAlienMinigame/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.openZapTheAlienGameUrl);
    this.modalService.open(content,{size: 'lg'});

  }
  openAppleKing(content){
    this.openAppleKingGameUrl=`https://www.playtolearn.in/AppleKing-minigame/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.openAppleKingGameUrl);
    this.modalService.open(content,{size: 'lg'});

  }
  openTGCToolBox(content){
    this.tgcToolBoxUrl=`https://coroebus.in/TGCToolbox/`
    this.safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.tgcToolBoxUrl)

    this.modalService.open(content,{size: 'xl'});

  }

  openDropdown(){
    this.hideDropDown=!this.hideDropDown;
    this.hideMobileDropDown=!this.hideMobileDropDown;
  }

  filter(category:any){
    console.log(category)
    this.filterByCategory=this.spotEngagementData
    .filter((a:any)=>{
      if(a?.spot_type==category || category=='')
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
    console.log(this.Passbook);
   this.Ascending=true;
   this.Descending=false;
  }
  filterByPointsDsc(){
    this.Passbook = this.spotEngagementPassbook.sort((a, b) => a.reward_point - b.reward_point);
    this.Descending=true;
    this.Ascending=false;
   
    
  }
  value = '2';
  clearText(){
    // this.term1="";
    this.searchSpotData="";

   if(!this.searchSpotData){
    this.searchData()
   }
   
  }
  clearRewardText(){
    this.searchFromReward="";
    if(!this.searchFromReward){
    this.rewardPassbook();

    }
   

  }

key = 'date_time_stamp';  

reverse = false;
  sortList(key) {
    console.log(key)
    this.key = key;
    this.reverse = !this.reverse;
  }
openEvent(){
  this.openEvents=true;
 
    this.openPassBook=false;
  
  
}
rewardPassBook(){
  console.log(this.id_role)
 
  this.openEvents=false;
  this.openPassBook=true;
}
dismiss(){
console.log('dismissModal')
  this.rewardPassbook();
 
}
searchData() {
  console.log(this.searchSpotData.length);
  
  if (!this.searchSpotData) {
    
    this.playZone()
    this.spotEngagementData = this.spotEngagementData;
  } else {
   
    this.spotEngagementData = this.spotEngagementData.filter((res) => {
    
      return res.spot_engagement_title.toLowerCase().includes(this.searchSpotData.toLowerCase());
    });
  }
}
searchFromRewardData(){
 
 
  if(!this.searchFromReward){
    this.Passbook=this.Passbook
    this.rewardPassbook();
  }
  else{
    this.Passbook=this.Passbook.filter((res)=>{
      return res.game_name.toLowerCase().includes(this.searchFromReward.toLowerCase())
    })
  }
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


  })
  // this.passDataToHeaderSub?.unsubscribe()
  // this.passDataToHeaderSub = this.eventService.subscribe('passDataToHeader', (data) => {
  //   this.headerInfo = data
    

  // })
  if (this.userSelectionData?.otherInfo) {
    this.headerInfo = this.userSelectionData?.otherInfo
    
    this.color = this.headerInfo?.color; //yellowcolor
    
    this.bgImage= this.userSelectionData?.themes[0]?.theme_background_web
    
    
    this.element?.nativeElement?.style?.setProperty('--myvar', `${this.color}`)
    this.element?.nativeElement?.style?.setProperty('--bgImage', `${this.bgImage}`)

    // this.element.nativeElement.style.setProperty('--mycolor',`${this.color}`)
    // 


  }
  this._routeSub = this._route.queryParams.subscribe(queryParams => {
    this.queryParams = queryParams
    
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


}
