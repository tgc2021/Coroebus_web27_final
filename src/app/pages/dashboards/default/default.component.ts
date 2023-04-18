import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpProtocols } from '@app/http/http.protocols';
import { DashboardModel } from '@models/dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import * as fromRoot from '../../../core/app-state';
import Swal from 'sweetalert2';
import { Util } from '@app/utils/util';
import { ImagecropperComponent } from '@pages/imagecropper/imagecropper.component';
import { EventService } from '@app/services/event.service';
import { NotificationPopupComponent } from '@pages/notification-popup/notification-popup.component';
import * as userActions from '../../../core/app-state/actions';
import * as _ from 'lodash';

import { ActivatedRoute, Event as Events, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastService } from '@app/services/toast-service';
import { ApiserviceService } from 'app/apiservice.service';
import { type } from 'jquery';
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, AfterViewInit, OnDestroy {

  hideSkeleton: boolean = false;
  sectionView_1: any
  sectionView_1_err: any
  sectionView_2: any
  sectionView_2_err: any
  sectionView_3: any = []
  sectionView_3_list: any = []
  sectionView_3_err: any
  notificationLists: any
  notificationList_err: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public isCollapsed = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  combineLatest: Subscription
  userSelectionData: any
  rewardPoints: any
  gamePoints: any
  activeTabForSectionView_2: any
  activeSubTabForSectionView_2: any
  activeTabOrderNumberForSectionView_2: any
  rankingDataFirstRowForSectionView_2: any
  filterRankingDataForSectionView_3: any = []
  pageNumberForSectionView_3: number = 1
  backUpData: any
  addInsList: any
  @ViewChild("scrollTarget") scrollTarget: ElementRef;
  spectSearchStr: string= '';
  spectSearchStrTrigger: boolean = false
  spectSearList: string
  @ViewChild('content') content;
  @ViewChild('pokeList') pokeList;
  @ViewChild('hierarchyPopup') hierarchyPopup;
  @ViewChild('pokeDangerTpl') pokeDangerTpl;
  levelsBucketsList: any
  levelsBucketsList_err: any
  pokeData: any
  arrowStatus: any
  pokeRowData: any
  callSectionView_1APISub: Subscription
  callNotificationAPIAfterReadSub: Subscription
  _routerSub: Subscription
  _routeSub: Subscription
  queryParams: any
  requestForProduce1Data: Subscription
  hierarchyPopupList: any
  pokeErr: any
  clicked = 0
  // declare by shubham
  labelNameMy: any
  pokeAnimationData: any;
  profile_flag: number;
  url: any;
  userID: any;
  edit_image: boolean;
  pokeAnimationData1: any;
  emojiText: any;
  idSelected: any;
  pockdata: any;
  emoji: any;
  pokeidselected: any;
  NotificationHide: boolean = false
  buletinsHide: boolean = false
  BucketListHide: boolean
  UserIdBucket: any
  firstUserData: any;
  getBackImagesFromSectionView1: any
  getBackImages: any = [];
  firstrowbackimage: any;
  web_first_tile_image: any;
  web_profile_back_image: any;
  searchbgimage:any
  search_bg_tile_image:any
  final_web_tile_image:any
  section1_tile_images: any
  web_tile_img:any
  location:any
  panelOpenState = false;
  dataForMonthlyPopup:any;
  monthlyPopup: any;
  seasonalThemeDaily: any;
  seasonalThemeMonthly: any;
  dataForDailyPopup: any;
  DailyPopup:any;
  isDailyModalopen: boolean;
  isWeeklyModalOpen: boolean;
  isMonthlyModalOpen: boolean;
  monthlyTopers: any;
  dataForWeeklyPopup: Object;
  weeklyPopup: any;
  seasonalThemeWeekly: any;
  weeklyTopers: any;
  seasonal_theme_weekly_badge_details: any;
  dailyToppers: any;
  role_id: any;
  dark_color: any;
 
  medium_color: any;
  gameID: string;
  roleID: string;
  data: any;
  count: any=0;
  seasonalThemeDailyBadges: any;
  seasonalThemeWeeklyBadges: any;
  seasonalThemeMonthlyBadges: any;
  onGoingChallenges: any;
  challengeReacieved: any;
  a:number=10;
  b:number=20;
  scoreTarget: any;
  scoreAchieved: any;
  triviaCornerData: any;
  hideTriviaIndicator: boolean;
  hideBattleGround: boolean=false;
  dailyBadges: boolean;
  dailyBadgesActive: boolean;
  weeklyBadgesActive: boolean;
  monthlyBadgesActive: boolean;
  seasonal_theme_daily_badge_details: any;
  totalTargetScore: any;
  totalTargetScoreForWeekly: number;
  seasonal_theme_monthly_badge_details: any;
  

  seasonalScoreAchived: any=[]
  seasonalScoreTarget:any=[]
  arrtrue:any=[]
  trues:any=[]
  badgePercentage: number;
  // seasonal_theme_monthly_badge_details: any;
  empid:any
  empemail:any
  empname:any
  emporg:any
  spectator_temporary_array: any=[];
  seasonalThemeDaily1: any;
  seasonalThemeWeekly2: any;
  seasonalThemeMonthl3: any;
  seasonalThemeDailyBadges1: any;
  seasonalThemeWeeklyBadges2: any;
  seasonalThemeMonthlyBadges3: any;
  totalTargetScoreForMontly: number;

  constructor(private readonly store: Store, private modalService: NgbModal,private renderer:Renderer2,
    public Util: Util, private eventService: EventService, private _router: Router,
    private _route: ActivatedRoute, public toastService: ToastService,public http:ApiserviceService,public elementref: ElementRef) {
    this.activeSubTabForSectionView_2 = 'My Store'
    this.Edit_image()
  }

  // ngOnChanges(){
  //   this.Edit_image()
  // }


  ngOnInit() {
    
    // var i=1
    // setTimeout(()=>{this.ShowTime(0)},1000)
    // setInterval(()=>{this.ShowTime(i++),8000})

    // this.emojiSelected(0,1)

    // this.challengeRecievedCount()
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.activeTab()
    this.Edit_image()
    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      console.log(login, theme, game)
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      
      console.log(this.userSelectionData);
      
      // this.GetDataFromProduceInfo();
      this._routeSub?.unsubscribe()
      this._routeSub = this._route.queryParams.subscribe(queryParams => {
        // do something with the query params
        console.log(queryParams?.userID);
       

        if (queryParams?.userID) {
          console.log(window.location.href);
          this.location=window.location.href
          if(this.location.includes("?")){
            this.hideBattleGround=true;
             var replacedUserId = queryParams?.userID.replace(/ /g, '+');
         console.log(replacedUserId);
        
         var replacedGameId = queryParams?.gameID.replace(/ /g, '+');
         console.log(replacedGameId);

         var replacedRoleId = queryParams?.roleID.replace(/ /g, '+');
         console.log(replacedRoleId);
            queryParams = { userID: this.Util.decryptData(replacedUserId), gameID: this.Util.decryptData(replacedGameId), roleID: this.Util.decryptData(replacedRoleId) }

          }
          else{
            queryParams = { userID: this.Util.decryptData(queryParams?.userID), gameID: this.Util.decryptData(queryParams?.gameID), roleID: this.Util.decryptData(queryParams?.roleID) }

          }
          this.queryParams = queryParams
          console.log(this.queryParams);

       

          this.getUserBannerDataSectionView_1(queryParams)
          this.getUserBannerDataSectionView_2(queryParams)
          this.getUserBannerDataSectionView_3(null, queryParams)
          this.GetDataFromProduceInfo(queryParams)
          // this.navigateToStatistics(queryParams)
          // this.notificationList(queryParams)
          // this.addIns(queryParams)
          this.notificationList()
          this.addIns()
        } else {
          this.getUserBannerDataSectionView_1()
          this.getUserBannerDataSectionView_2()
          this.getUserBannerDataSectionView_3()
          this.GetDataFromProduceInfo(queryParams)
          // this.navigateToStatistics()

          this.notificationList()
          this.addIns()

        }
      });
    
    })
  
  
   
    
    this.callSectionView_1APISub?.unsubscribe()
    this.callSectionView_1APISub = this.eventService.subscribe('callSectionView_1API', () => {
      this.getUserBannerDataSectionView_1()
      this.store.select(fromRoot.userLogin)
    })
    this.callNotificationAPIAfterReadSub?.unsubscribe()
    this.callNotificationAPIAfterReadSub = this.eventService.subscribe('callNotificationAPIAfterRead', (data) => {
      this.updateNotificationList(data?.id)
    })
    this.requestForProduce1Data?.unsubscribe()
    this.requestForProduce1Data = this.eventService.subscribe('requestForProduce1Data', (data) => {
      this.eventService.broadcast('requestSendForProduce1Data', this.sectionView_1)
    })
    
  
    

  }
 
  Edit_image() {
    setTimeout(() => { this.Edit_image() }, 1000 * 1)
    var url_string = window.location.href
    // console.log(url_string);
    var userID = url_string.includes("?"); // true
    // console.log(userID)
    if (userID === true) {
      this.edit_image = false
    }
    else {
      this.edit_image = true
    }
    
    // console.log(this.userID);
  }



  ngAfterViewInit() {
    this.edit_image;
    
    setTimeout(()=>{
      // this.changeTabFilter('',this.b)
      this.changeSubTabFilter('My Store')
    },3000)
   
  }



  async getUserBannerDataSectionView_1(queryParams?: any) {
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game, "_section_view": "1", "page_number": "1", "device_type": "W"

    };
    [err, res] = await HttpProtocols.to(DashboardModel.getUserBannerDataSectionView_1(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Dashboard",
        _description:"Dashboard"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.sectionView_1 = res?.data
console.log(this.sectionView_1.is_about_game);
localStorage.setItem('bg_image',this.sectionView_1?.theme_details?.[0]?.point_dist_background)

      console.log(this.sectionView_1?.theme_details?.[0]?.dark_color);
      
      this.pokeAnimationData = this.sectionView_1._poked_data
      // this.pokeAnimationData1=this.sectionView_1._poked_data[0].poke_description

      console.log(this.pokeAnimationData);
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.getBackImagesFromSectionView1 = this.sectionView_1._back_images[1]._data;

      this.getBackImages.push(...this.getBackImagesFromSectionView1);


      console.log(this.getBackImages);
      console.log("Section_view1_Data.....", this.getBackImagesFromSectionView1);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // alert(this.pokeAnimationData)

      this.rewardPoints = this.sectionView_1?._points?.filter(data => data?.label === 'Reward Point')
      //this.gamePoints = this.sectionView_1?._points?.filter(data => data?.label === 'Tribe Point' ? data?.label === 'Tribe Point' : data?.label === 'Game Point')
      this.gamePoints = this.sectionView_1?._points?.filter(data => data?.type === 'comp-point')
      document.body.classList.add('dashboard-bg-image');
      const bgImg = this.Util?.isMobile() ? this.sectionView_1?.theme_details?.[0]?.theme_background : this.sectionView_1?.theme_details?.[0]?.theme_background_web
      document.body.style.backgroundImage = 'url(' + bgImg + ')'

      this.web_profile_back_image= this.sectionView_1._back_images[1]._data[0].ranking_image_profile;
      console.log(this.web_profile_back_image);
      
     
      this.eventService.broadcast('passDataToHeader', {
        color: this.sectionView_1?.theme_details?.[0]?.dark_color,
        game_name: this.sectionView_1?._personal_data?.game_name,
        game_logo: this.sectionView_1?._personal_data?.game_logo,

      })

  
    
    
      this.store.dispatch(userActions.updateUserObj({
        data: {
          color: this.sectionView_1?.theme_details?.[0]?.dark_color,
          game_name: this.sectionView_1?._personal_data?.game_name,
          game_logo: this.sectionView_1?._personal_data?.game_logo,
          id_coroebus_game: this.sectionView_1?._personal_data?.id_coroebus_game,
          id_coroebus_team: this.sectionView_1?._personal_data?.id_coroebus_team,
          _personal_data: this.sectionView_1?._personal_data
        }

       
        
      }));
    } else {
      this.sectionView_1_err = 'Please try after some time'
    }
  }


  async getUserBannerDataSectionView_2(queryParams?: any) {
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game, "_section_view": "2", "page_number": "1"
    };
    [err, res] = await HttpProtocols.to(DashboardModel.getCenterDataSectionView_2(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      this.sectionView_2 = res?.data
console.log(this.sectionView_2);

this.labelNameMy= this.sectionView_2?._ranking_data[0].label
      // for(let i=0;i<this.sectionView_2?._ranking_data?.length;i++){
      if (this.queryParams?.roleID == '6' || this.userSelectionData?._personal_data?.id_role == '6') {
        console.log("tab", this.activeTabForSectionView_2);
        console.log("tab bool", this.queryParams?.roleID);

        // this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        console.log(this.activeTabForSectionView_2);

        this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order

        this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)

        console.log();

        this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level

        for (let item of this.getBackImages) {
        

          if (item.ranking_image_level === this.firstrowbackimage) {

            this.web_first_tile_image = item.ranking_image
            console.log(this.web_first_tile_image)
          }

        }

        
        


        if (this.queryParams?.roleID == '4') {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[1].order
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[1].order
          this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)

          this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
          console.log(this.firstrowbackimage);
  
          for (let item of this.getBackImages) {
            console.log(item.ranking_image_level);
            console.log(this.firstrowbackimage);
  
            if (item.ranking_image_level === this.firstrowbackimage) {
  
              this.web_first_tile_image = item.ranking_image
              console.log(this.web_first_tile_image);
  
  
  
            }
  
          }
          console.log('Active tab 2');


        }
        else if (this.queryParams?.roleID == '3') {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[2].order
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[2].order
          this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
          console.log('Active tab 3');
          this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
          console.log(this.firstrowbackimage);
  
          for (let item of this.getBackImages) {
            console.log(item.ranking_image_level);
            console.log(this.firstrowbackimage);
  
            if (item.ranking_image_level === this.firstrowbackimage) {
  
              this.web_first_tile_image = item.ranking_image
              console.log(this.web_first_tile_image);
  
  
  
            }
  
          }

        }
        else if (this.queryParams?.roleID == '8') {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[3].order
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[3].order
          this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
          this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
          console.log(this.firstrowbackimage);
  
          for (let item of this.getBackImages) {
            console.log(item.ranking_image_level);
            console.log(this.firstrowbackimage);
  
            if (item.ranking_image_level === this.firstrowbackimage) {
  
              this.web_first_tile_image = item.ranking_image
              console.log(this.web_first_tile_image);
  
  
  
            }
  
          }
          console.log('Active tab 4');

        }
        else if (this.queryParams?.roleID == '' || this.queryParams?.roleID == null || this.queryParams?.roleID === 'undefined' || (this.queryParams?.roleID == this.userSelectionData?._personal_data?.id_role)) {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
          this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
          this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
          console.log(this.firstrowbackimage);
  
          for (let item of this.getBackImages) {
            console.log(item.ranking_image_level);
            console.log(this.firstrowbackimage);
  
            if (item.ranking_image_level === this.firstrowbackimage) {
  
              this.web_first_tile_image = item.ranking_image
              console.log(this.web_first_tile_image);
  
  
  
            }
  
          }
          console.log('Active tab 1');


        }
        else {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
          console.log('Active tab 1');   this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
          console.log(this.firstrowbackimage);
  
          for (let item of this.getBackImages) {
            console.log(item.ranking_image_level);
            console.log(this.firstrowbackimage);
  
            if (item.ranking_image_level === this.firstrowbackimage) {
  
              this.web_first_tile_image = item.ranking_image
              console.log(this.web_first_tile_image);
  
  
  
            }
  
          }

        }

        this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
        // }

      }


      else if (this.queryParams?.roleID === '4' || this.userSelectionData?._personal_data?.id_role === '4') {
        this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        

        if (this.queryParams?.roleID === '3') {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order

        }
        else if (this.queryParams?.roleID === '8') {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order

        }
        // else if(this.queryParams?.roleID===''|| this.queryParams?.roleID==null ||this.queryParams?.roleID==='undefined'){
        //   this.activeTabForSectionView_2=this.sectionView_2?._ranking_data?.[0].order
        //   console.log("id 4");            

        // }
        console.log("tab", this.activeTabForSectionView_2);
        console.log("tab bool", this.queryParams?.roleID === '4' || this.userSelectionData?._personal_data?.id_role === '4');

        this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
        // }

        this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
        console.log(this.firstrowbackimage);

        for (let item of this.getBackImages) {
          console.log(item.ranking_image_level);
          console.log(this.firstrowbackimage);

          if (item.ranking_image_level === this.firstrowbackimage) {

            this.web_first_tile_image = item.ranking_image
            console.log(this.web_first_tile_image);



          }

        }

      }


      else if (this.queryParams?.roleID === '3' || this.userSelectionData?._personal_data?.id_role === '3') {
        this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order

        if (this.queryParams?.roleID === '8') {
          this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[3].order

        }
        // else if(this.queryParams?.roleID===''|| this.queryParams?.roleID==null ||this.queryParams?.roleID==='undefined'){
        //   this.activeTabForSectionView_2=this.sectionView_2?._ranking_data?.[0].order
        //   console.log("id 4");            

        // }
        console.log(this.activeTabForSectionView_2);
        this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
        // }

        this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
        console.log(this.firstrowbackimage);

        for (let item of this.getBackImages) {
          console.log(item.ranking_image_level);
          console.log(this.firstrowbackimage);

          if (item.ranking_image_level === this.firstrowbackimage) {

            this.web_first_tile_image = item.ranking_image
            console.log(this.web_first_tile_image);



          }

        }
      }

      else if (this.queryParams?.roleID === '8' || this.userSelectionData?._personal_data?.id_role === '8') {
        this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[3].order

        // if(this.queryParams?.roleID===''|| this.queryParams?.roleID==null ||this.queryParams?.roleID==='undefined'){
        //   this.activeTabForSectionView_2=this.sectionView_2?._ranking_data?.[0].order
        //   console.log("id 4");            

        // }
        console.log(this.activeTabForSectionView_2);
        this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
        // }

        this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
        console.log(this.firstrowbackimage);

        for (let item of this.getBackImages) {
          console.log(item.ranking_image_level);
          console.log(this.firstrowbackimage);

          if (item.ranking_image_level === this.firstrowbackimage) {

            this.web_first_tile_image = item.ranking_image
            console.log(this.web_first_tile_image);



          }

        }
      }
      else if ((this.queryParams?.roleID === '9' || this.userSelectionData?._personal_data?.id_role === '9')
        || (this.queryParams?.roleID === '10' || this.userSelectionData?._personal_data?.id_role === '10')
        || (this.queryParams?.roleID === '11' || this.userSelectionData?._personal_data?.id_role === '11')
        || (this.queryParams?.roleID === '12' || this.userSelectionData?._personal_data?.id_role === '12')
      ) {
        this.activeTabForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order

        // if(this.queryParams?.roleID===''|| this.queryParams?.roleID==null ||this.queryParams?.roleID==='undefined'){
        //   this.activeTabForSectionView_2=this.sectionView_2?._ranking_data?.[0].order
        //   console.log("id 4");            

        // }
        console.log(this.activeTabForSectionView_2);
        this.activeTabOrderNumberForSectionView_2 = this.sectionView_2?._ranking_data?.[0].order
        this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
        // }
        this.firstrowbackimage = this.rankingDataFirstRowForSectionView_2[0]._data[0].ranking_image_level
        console.log(this.firstrowbackimage);

        for (let item of this.getBackImages) {
          console.log(item.ranking_image_level);
          console.log(this.firstrowbackimage);

          if (item.ranking_image_level === this.firstrowbackimage) {

            this.web_first_tile_image = item.ranking_image
            console.log(this.web_first_tile_image);



          }

        }
      }

    } else {
      this.sectionView_2_err = 'Please try after some time'
    }
  }


  async getUserBannerDataSectionView_3(viewMore?: any, queryParams?: any) {
    // debugger
    console.log(viewMore);
    
    console.log(queryParams);
    
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game, "_section_view": "3", "page_number": this.pageNumberForSectionView_3
    };
    localStorage.setItem('body_userid',body._userid);
    localStorage.setItem('body_game',body._game);

    [err, res] = await HttpProtocols.to(DashboardModel.getRankingAndOtherDataSectionView_3(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      this.pokeData = res?.data?._poke_list
      if (viewMore) {
        console.log('inside viewmore');
        
        res?.data?._ranking_data?.forEach((element, index) => {
          console.log(element,index);
          console.log(this.sectionView_3?._ranking_data[index]?.label);
          
          if (element?.label === this.sectionView_3?._ranking_data[index]?.label) {
            console.log(element?._Overall);
            
            if (element?._Overall?.length > 0 || element?._data?.length > 0) {
              
              // console.log(this.sectionView_3?._ranking_data[index]?._Overall?.push(...element?._Overall));
              // console.log(this.sectionView_3?._ranking_data[index]?._data?.push(...element?._data));

              this.sectionView_3?._ranking_data[index]?._Overall?.push(...element?._Overall)
              // this.sectionView_3?._ranking_data[index]?._data?.push(...element?._data)

              this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });
            }
          }

        });
      } else {
        this.sectionView_3 = res?.data
      }
      // this.filterRankingData()

      this.sectionView_3_list = this.sectionView_3?._ranking_data?.filter(data => {
        //console.log(data)
        if (data.order === this.activeTabForSectionView_2) {
          return data
        }
      })
      //console.log(this.sectionView_3_list)
    } else {
      this.sectionView_3_err = 'Please try after some time'
    }
  }
  filterRankingData() {
    
    this.sectionView_3._ranking_data = this.sectionView_3?._ranking_data?.filter((firstLevel) => {
      firstLevel = firstLevel?.[this.activeSubTabForSectionView_2 === 'My Store' ? '_data' : '_Overall']?.filter((secondLevel) => {
        secondLevel = this.sectionView_1?._back_images?.filter((compareData) => {
          if (compareData?.label === 'badge images') {
            compareData?._data?.filter((backImages) => {
              if (secondLevel?.ranking_badge_level === backImages?.ranking_badge_level) {
                secondLevel.ranking_badge_level_img = backImages?.ranking_badge
              }
            })
          } else {
            compareData?._data?.filter((backImages) => {
              // console.log(secondLevel?.ranking_image_level, backImages?.ranking_image_level, secondLevel?.ranking_image_level === backImages?.ranking_image_level)
              if (secondLevel?.ranking_image_level === backImages?.ranking_image_level) {
                secondLevel.ranking_image_level_img = backImages?.ranking_image
              }
            })
          }
          return secondLevel
        })
        return secondLevel
      })
      return firstLevel
    })
  }
  ngOnDestroy(): void {
    document.body.classList.remove('dashboard-bg-image');
    document.body.style.backgroundImage = "url('')"
    this.callSectionView_1APISub?.unsubscribe()
    this.callNotificationAPIAfterReadSub?.unsubscribe()
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.combineLatest?.unsubscribe()
    this.toastService?.clear()
  }
  async openPopupForTeam() {
    let err: any, res: any;
    let body: any;
    body = { "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game, "_role": this.userSelectionData?._personal_data?.id_role };
    [err, res] = await HttpProtocols.to(DashboardModel.levelsBuckets(body))
    if (!err && res?.statuscode === 200) {
      this.levelsBucketsList = res?.data;

      this.modalService.open(this.content, { centered: true, windowClass: 'modal-cls' });
    } else {
      this.levelsBucketsList_err = 'Error'
    }
  }
  changeTabFilter(name: string, order: any) {
   
    // this.spectSearchStr=null
    // this.labelNameMy = name
    this.pageNumberForSectionView_3 = 1
    this.activeTabForSectionView_2 = order
    console.log(this.activeTabForSectionView_2);
    // this.spectSearchStr=null

if(this.activeTabForSectionView_2 == 1){
  let body={
    "_userid": this.userSelectionData?._personal_data?.USERID,
    "_game":this.userSelectionData?.id_coroebus_game,
    _device:"W",
    _section:"Dashboard",
    _description: this.sectionView_2._ranking_data[0].label+' Tab'
  }


  this.http.engagamentlog(body).subscribe(res=>{
    console.log(res);
    
  })
}
else if(this.activeTabForSectionView_2 == 2){
  let body={
    "_userid": this.userSelectionData?._personal_data?.USERID,
    "_game":this.userSelectionData?.id_coroebus_game,
    _device:"W",
    _section:"Dashboard",
    _description: this.sectionView_2._ranking_data[1].label+' Tab'
  }
  this.http.engagamentlog(body).subscribe(res=>{
    console.log(res);
  })
}
else if(this.activeTabForSectionView_2 == 3){
  let body={
    "_userid": this.userSelectionData?._personal_data?.USERID,
    "_game":this.userSelectionData?.id_coroebus_game,
    _device:"W",
    _section:"Dashboard",
    _description: this.sectionView_2._ranking_data[2].label+' Tab'
  }


  this.http.engagamentlog(body).subscribe(res=>{
    console.log(res);
    
  })
}
else if(this.activeTabForSectionView_2 == 4){
  let body={
    "_userid": this.userSelectionData?._personal_data?.USERID,
    "_game":this.userSelectionData?.id_coroebus_game,
    _device:"W",
    _section:"Dashboard",
    _description: this.sectionView_2._ranking_data[3].label+' Tab'
  }


  this.http.engagamentlog(body).subscribe(res=>{
    console.log(res);
    
  })
}

    console.log("Order ",order)
    this.activeTabOrderNumberForSectionView_2 = order
    this.activeSubTabForSectionView_2 = 'My Store'
    this.rankingDataFirstRowForSectionView_2 = this.sectionView_2?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
    this.sectionView_3_list = this.sectionView_3?._ranking_data?.filter(data => data.order === this.activeTabForSectionView_2)
    if (this.spectSearchStr) {
      this.spectSearch()
    }
  }
  upDownArrow(arrowStatus: string, rowData: any) {
    // alert('TODO: Add Poke popup-> ' + arrowStatus)
    //console.log(rowData)
    if (rowData?.userid !== this.userSelectionData?._personal_data?.USERID) {
      let roleCheckArray = this.Util.pokeMapping()
      if (this.queryParams?.roleID) {
        console.log(this.queryParams?.roleID)
        //roleCheckArray = roleCheckArray?.filter(data => data?.roleID === this.sectionView_1?._personal_data?.id_role)
        roleCheckArray = roleCheckArray?.filter(data => data?.roleID === this.queryParams?.roleID)
      } else {
        roleCheckArray = roleCheckArray?.filter(data => data?.roleID === this.userSelectionData?._personal_data?.id_role)
      }
      //console.log(this.queryParams)
      if (roleCheckArray?.[0]?.canPokeTo?.indexOf(rowData?.id_role) > -1) {
        this.pokeRowData = rowData
        this.arrowStatus = arrowStatus === 'red' ? 'Motivation' : 'Positive'
        console.log(this.arrowStatus);

        // this.modalService.open(this.pokeList, { centered: true, windowClass: 'modal-cls' })

      } else {
        this.toastService.show(this.pokeDangerTpl, { classname: '', delay: 1500, });
        // this.pokeErr = `Role id ${this.queryParams?.roleID ? this.queryParams?.roleID : this.userSelectionData?._personal_data?.id_role} can't pokes to role id ${rowData?.id_role}`
        console.warn(`Role id ${this.queryParams?.roleID ? this.queryParams?.roleID : this.userSelectionData?._personal_data?.id_role} can't pokes to role id ${rowData?.id_role}`)
      }

    }
  }
  viewMore() {
    
    this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
    console.log(this.queryParams);
    
    this.getUserBannerDataSectionView_3(1,this.queryParams)
  }

  async notificationList(queryParams?: any) {
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    };
    [err, res] = await HttpProtocols.to(DashboardModel.notificationList(body))
    if (!err && res?.statuscode === 200) {
      this.notificationLists = res?.data?.[0]?.list
      // console.log(res?.data?.[0]?.list);

      if (this.notificationLists === "") {
        this.NotificationHide = true
      }

    } else {
      this.notificationList_err = 'Error'

    }
  }
  async updateNotificationList(id: any) {
    let err: any, res: any;
    let body: any;
    body = { "_notificationid": id };
    [err, res] = await HttpProtocols.to(DashboardModel.notificationUpdate(body))
    if (!err && res?.statuscode === 200) {
      this.notificationList()
    } else {
      this.notificationList_err = 'Error'
    }
  }
  async addIns(queryParams?: any) {
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    };
    [err, res] = await HttpProtocols.to(DashboardModel.addIns(body))
    if (!err && res?.statuscode === 200) {
      this.addInsList = res?.data
      // console.log(this.addInsList);

      if (this.addInsList.length === 0) {
        this.buletinsHide = true
      }
      else{
        this.buletinsHide = false;
      }

    } else {
      this.notificationList_err = 'Error'
    }
  }

  

  checkEmpty(){
    this.spectSearList=null

    if(this.spectSearchStr==''){
      
      this.spectSearchStr=''
      // this.emptyInput==true;
      this.spectSearchStrTrigger = false
      // this.spectSearch()
   
      // this.spectSearchStr.setValue('');
      // this.ngOnInit()
    }
  }

  async spectSearch() {
    let err: any, res: any;
    let body: any;
    // this.spectSearchStrTrigger = true

    if (this.spectSearchStr) {
      this.spectSearchStrTrigger = true
    }
  
    else{
      this.spectSearchStrTrigger = false;

    }
    
    body = {
      "_userid": this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game,
      "page_number": this.pageNumberForSectionView_3,
      "_uname": this.spectSearchStr,
      "_order": this.activeTabOrderNumberForSectionView_2
    };
    [err, res] = await HttpProtocols.to(DashboardModel.spectSearch(body))
    if (!err && res?.statuscode === 200) {

      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Dashboard",
        _description:"Search"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.spectSearList = res?.data
      console.log(this.spectSearList);
    
      this.searchbgimage= this.spectSearList[0]
      this.search_bg_tile_image=this.searchbgimage._data
      console.log(this.search_bg_tile_image);

      this.search_bg_tile_image.map(res=>{
       
        this.final_web_tile_image=res
        console.log(this.final_web_tile_image);
        
        console.log(this.getBackImagesFromSectionView1);

        this.getBackImagesFromSectionView1.map(res=>{
          
          this.section1_tile_images=res
          console.log(this.section1_tile_images);
          console.log(this.final_web_tile_image.ranking_image_level);
          console.log(this.section1_tile_images.ranking_image_level);
          if(this.final_web_tile_image.ranking_image_level == this.section1_tile_images.ranking_image_level){
            console.log('true');
            
           this.web_tile_img= this.section1_tile_images.ranking_image
            console.log(this.web_tile_img);
            
           }

           console.log(this.web_tile_img);


        })
        
         
    
      })
      

    } else {
      this.notificationList_err = 'Error'
    }
  }
  emojiSelected(id, event) {
    // $('.emojiBackgroundButton').removeClass('acrtive')
    this.clicked = id
    this.emojiText = this.pokeData
    this.idSelected = event === 'Positive' ? 0 : 1
    this.pokeidselected = this.emojiText[this.idSelected]._data[id].poke_description
    this.emoji = this.emojiText[this.idSelected]._data[id].poke_description
    //  console.log(this.idSelected);


  }
  async pokeSelection(modal: any) {
    let err: any, res: any;
    let body: any;
    if (this.spectSearchStr) {
      this.spectSearchStrTrigger = true
    } else {
      this.spectSearchStrTrigger = false
    }
    body = {
      "_userid": this.pokeRowData?.userid,// this.userSelectionData?._personal_data?.USERID,
      "_team": this.pokeRowData?.id_coroebus_team,
      "_game": this.pokeRowData?.id_coroebus_game,
      "_id_user_poked": this.pokeRowData?.id_coroebus_user,
      "_pokeid": this.pokeidselected
    };
    [err, res] = await HttpProtocols.to(DashboardModel.pokeSelection(body))
    if (!err && res?.statuscode === 200) {
      modal?.dismiss('Cross click')
      Swal.fire({
        title: '',
        text: res?.message,
        // imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    } else {
      this.notificationList_err = 'Error'
    }
  }
  previewFile(event: Event) {
    const element = event?.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const modalRef = this.modalService.open(ImagecropperComponent, { centered: true, windowClass: 'modal-cls' })
      modalRef.componentInstance.fileData = event;
      modalRef.componentInstance.buttonColor = this.sectionView_1?.theme_details?.[0]?.dark_color;
      modalRef.componentInstance.userObj = this.sectionView_1?._personal_data;

      let body={
        "_userid":  this.userSelectionData?._personal_data?.USERID,
        "_game": this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Profile",
        _description: "Profile Edit from Dashboard"
      }
    
    
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })
      // console.log("FileUpload -> files", fileList);
    }
    this.getUserBannerDataSectionView_2()
    this.userSelectionData
  }
  openNotification(data: any) {
    const modalRef = this.modalService.open(NotificationPopupComponent, { centered: true, windowClass: 'modal-cls' })
    modalRef.componentInstance.notoficationData = data;
  }
  getDataBasedOnUserID(data: any) {
    console.log(data?.role_id)
    this.role_id= data?.role_id.toString();
    console.log(this.role_id)
    this.Edit_image();
 
    if(this.role_id==='8'||this.role_id=='9'||this.role_id=='12'){
      

      this._router.navigate(['/top_dashboard'], {
        relativeTo: this._route,
        queryParams: {
          userID: this.Util.encryptData(data?._userid),
          gameID: this.Util.encryptData(data?.game_id),
          roleID: this.Util.encryptData(data?.role_id?.toString())
  
        },
      
        queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        // skipLocationChange: false
        // do not trigger navigation
  
  
      });
    }
    else{
      this.pageNumberForSectionView_3=1
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: {
          userID: this.Util.encryptData(data?._userid),
          gameID: this.Util.encryptData(data?.game_id),
          roleID: this.Util.encryptData(data?.role_id?.toString())
  
        },
      
        queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        skipLocationChange: false
        // do not trigger navigation
  
  
      });

    }
  
    this.Edit_image()
   


  }




  changeSubTabFilter(tabName: string) {
    this.activeSubTabForSectionView_2 = tabName
     
    // this.filterRankingData()
  }
  async openHierarchyPopup(data?: any) {
    console.log(data)
    let err: any, res: any;
    let body: any;
    // body = {
    //   "_userid": this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
    //   "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    // };
    body = {
      "_userid": data?.userid,
      "_game": data?.id_coroebus_game
    };
    [err, res] = await HttpProtocols.to(DashboardModel.hierarchyPopup(body))
    if (!err && res?.statuscode === 200) {
      this.hierarchyPopupList = res?.data
      this.firstUserData = this.hierarchyPopupList[0]
      console.log(this.firstUserData);

      console.log(this.hierarchyPopupList);

      this.modalService.open(this.hierarchyPopup, { centered: true, windowClass: 'modal-cls' });
    } else {
      // this.levelsBucketsList_err = 'Error'
    }
    
  }
  getDataBasedOnUserIDVIAhierarchyPopupList(data: any, modal: any) {
    modal.dismiss('Cross click')
    let obj = {
      _userid: data?.USERID,
      game_id: data?.id_coroebus_game,
      role_id: data?.id_role
    }
    console.log(obj)
    this.getDataBasedOnUserID(obj)
  }



  // ShowTime(i)
  // {
  //   if(this.pokeAnimationData){
  //    if(i<this.pokeAnimationData.length){
  // $('#animationPoke').attr('style','display:block !important')
  // $('.poke-slide'+i).removeClass('star-wars')
  //    }
  //   }
  // }

  activeTab() {
    console.log(this.queryParams);
  }

  navigateToRewards(data) {
    console.log(data);
    var url_string = window.location.href
    console.log(url_string);
    var userID = url_string.includes("?"); // true

    if (url_string.includes("?")) {
      console.log("spectator view");
      this._router.navigate(['reward/rewardPoints'])
    }
    else if (url_string.includes("")) {
      this._router.navigate(['reward/rewardPoints'])

    }
  }


  getRewards(){
    
    console.log('rewards page');
    
    let obj = {
      _userid: this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,

      game_id: this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    }
    console.log(obj)

    localStorage.setItem('rewardid',obj._userid)

    // this._router.navigate('/performance/page')
    // this._router.navigate(['/performance/page'], { queryParams: { key: value } })

    this._router.navigate(['/reward/rewardPoints'], {
      relativeTo: this._route,
      queryParams: {
        userID: this.Util.encryptData(this.queryParams?.userID),
        gameID: this.Util.encryptData(this.queryParams?.gameID),
        // roleID: this.Util.encryptData(this.queryParams?.roleID)

      },

      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation


    });
  }

  getGraphDataById() {
    // console.log('Graph data',data);
    let obj = {
      _userid: this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,

      game_id: this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    }
    console.log(obj)

    let body={
      "_userid": this.userSelectionData?._personal_data?.USERID,
      "_game":this.userSelectionData?.id_coroebus_game,
      _device:"W",
      _section:"Performance",
      _description: "From Points Distribution"
    }
  
  
    this.http.engagamentlog(body).subscribe(res=>{
      console.log(res);
      
    })

    // this._router.navigate('/performance/page')
    // this._router.navigate(['/performance/page'], { queryParams: { key: value } })
    this._router.navigate(['/performance/page'], {
      relativeTo: this._route,
      queryParams: {
        userID: this.Util.encryptData(this.queryParams?.userID),
        gameID: this.Util.encryptData(this.queryParams?.gameID),
        // roleID: this.Util.encryptData(this.queryParams?.roleID)

      },

      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation


    });
  }



  navigateToOtherRole(item){
    
    console.log(item);
    this.userID= this.Util.encryptData(item?.userid);
    this.gameID= this.Util.encryptData(item?.id_coroebus_game);
    this.roleID= this.Util.encryptData(item?.id_role);
     this._router.navigateByUrl('/dashboard?userID='+this.userID +"&gameID="+ this.gameID +"&roleID="+this.roleID)
    
  }

  navigateToNewChallenge(){
  
    let  _userid=this.userSelectionData?._personal_data?.USERID;
    let id_coroebus_game=this.userSelectionData?.id_coroebus_game;
    let id_role=this.sectionView_1._personal_data.id_role;
    let id_coroebus_user=this.sectionView_1._personal_data.id_coroebus_user;
    console.log(this.userSelectionData);
    const userId = this.Util.encryptData(_userid)
    const game = this.Util.encryptData(id_coroebus_game)
    const roleid = this.Util.encryptData(id_role)
    const spectStaus='yes'
    
    if(this.userSelectionData.is_champions_league=='A'){
      
      window.open(
      //  'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,

      // 'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
      // '_self' // <- This is what makes it open in a new window.

      'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
      '_self'
   

    )

    }
    
     
     
       

      
      
      
    }

  navigateToOnGoingChallenge(){
  
      let  _userid=this.userSelectionData?._personal_data?.USERID;
      let id_coroebus_game=this.userSelectionData?.id_coroebus_game;
      let id_role=this.sectionView_1._personal_data.id_role;
      let id_coroebus_user=this.sectionView_1._personal_data.id_coroebus_user;
  
      console.log(this.userSelectionData);
  
  
  
      const userId = this.Util.encryptData(_userid)
      const game = this.Util.encryptData(id_coroebus_game)
      const roleid = this.Util.encryptData(id_role)
  
      
      if(this.userSelectionData.is_champions_league=='A'){
        
        window.open(
        'http://coroebus.in/champions_league/#/home/onGoing?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
        '_self' // <- This is what makes it open in a new window.

        // 'http://localhost:56671/champions_league/#/home/onGoing?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
        // '_self'
     
  
      )
  
      }
      
       
       
         
  
        
        
        
    }

  navigateToChallengeRecieved(){

    let  _userid=this.userSelectionData?._personal_data?.USERID;
      let id_coroebus_game=this.userSelectionData?.id_coroebus_game;
      let id_role=this.sectionView_1._personal_data.id_role;
      let id_coroebus_user=this.sectionView_1._personal_data.id_coroebus_user;
  
      console.log(this.userSelectionData);
  
  
  
      const userId = this.Util.encryptData(_userid)
      const game = this.Util.encryptData(id_coroebus_game)
      const roleid = this.Util.encryptData(id_role)
  
      
      if(this.userSelectionData.is_champions_league=='A'){
        
        window.open(
        'http://coroebus.in/champions_league/#/home/challengeRecieved?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
        '_self' // <- This is what makes it open in a new window.

        // 'http://localhost:56671/champions_league/#/home/challengeRecieved?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
        // '_self'
     
  
      )
  
        }
      

  }
  navigateToStatistics(queryParams?: any){

    // localStorage.setItem('body_userid',body._userid);
    // localStorage.setItem('body_game',body._game);

     let  _userid = localStorage.getItem('body_userid');
      let id_coroebus_game = localStorage.getItem('body_game');
      let id_role=this.sectionView_1._personal_data.id_role;
      let id_coroebus_user=this.sectionView_1._personal_data.id_coroebus_user;
  
      console.log(this.userSelectionData);
  
  
  
      const userId = this.Util.encryptData(_userid)
      const game = this.Util.encryptData(id_coroebus_game)
      const roleid = this.Util.encryptData(id_role)
      const spectStaus='yes'

      if(this.userSelectionData.is_champions_league=='A'){
        console.log(this.hideBattleGround);
        
        if(this.hideBattleGround){
          console.log('no hide');
          
          window.open(
            // 'http://coroebus.in/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user+"spect="+"yes",
            // '_self' // <- This is what makes it open in a new window.
             'http://coroebus.in/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user+"&status="+"total",
            '_self' // <- This is what makes it open in a new window.
          )
        }
     else{
      console.log('hide');

      window.open(
        
        'https://coroebus.in/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user+"&status="+"total"+"&spect="+spectStaus,
        '_self' // <- This is what makes it open in a new window.

        //  'http://localhost:56671/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
        // '_self' // <- This is what makes it open in a new window.
        
     
  
      )

     }
  
        }
      

  }

  navigateToStatisticsSpect(queryParams?: any){
    let  _userid = localStorage.getItem('body_userid');
    let id_coroebus_game = localStorage.getItem('body_game');
    let id_role=this.sectionView_1._personal_data.id_role;
    let id_coroebus_user=this.sectionView_1._personal_data.id_coroebus_user;

    console.log(this.userSelectionData);



    const userId = this.Util.encryptData(_userid)
    const game = this.Util.encryptData(id_coroebus_game)
    const roleid = this.Util.encryptData(id_role)
    const spectStaus='yes'

    console.log('http://coroebus.in/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user+"&status="+"total"+"&spect="+spectStaus);
    
    window.open(
        
      'http://coroebusbeta.in/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user+"&status="+"total"+"&spect="+spectStaus,
      '_self' // <- This is what makes it open in a new window.

      //  'http://localhost:56671/champions_league/#/home/statistics?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+id_coroebus_user,
      // '_self' // <- This is what makes it open in a new window.
      
   

    )
  }

  navigateToDashboard(){
    location.reload()
  }
  navigateToM2ost(){
    this.empid= this.sectionView_1._personal_data.EMPLOYEEID
    this.empemail=this.sectionView_1._personal_data.email_id
    this.empname=this.sectionView_1._personal_data.first_name
    this.emporg=this.sectionView_1._personal_data.organization_name
    window.open(
      // https://www.m2ost.in/m2ostproductionapiSSO/api/m2ostSSO?param=empid$103$empemail$empname$TGC
    
      'https://www.m2ost.in/m2ostproductionapiSSO/api/m2ostSSO?param='+this.empid +'$113$'+this.empemail+'$'+this.empname+'$'+this.emporg,
      'blank'
   

    )
  }

  // challengeRecievedCount(){
  //     console.log("Neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew",this.userSelectionData);
    
  //     let id_coroebus_game=this.userSelectionData?.id_coroebus_game;
  //     let id_role=this.userSelectionData?.games[0]?.id_role;
  //     let id_coroebus_user=this.userSelectionData?._personal_data.id_coroebus_user;

  //   let bodyforChallengeRecieved={
  //     "_game": id_coroebus_game,
  //     "_id_role": id_role,
  //     "id_coroebus_user": id_coroebus_user

  //   }
  //   this.http.challangeRecived(bodyforChallengeRecieved).subscribe((res)=>{
  //     console.log(res);
  //     this.data=res;
  //     this.count=this.data.length;
  //     console.log(this.count);
  //   })
    
      
  // }

  GetDataFromProduceInfo(queryParams?:any){

    console.log(queryParams.gameID 
      )
      
    
      let obj = {
        _userid:queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
        _game:queryParams?.gameID ?queryParams?.gameID : this.userSelectionData?.id_coroebus_game
      }
      console.log("check body",obj)
      this.http.produceInfo(obj).subscribe((res)=>{
        console.log(res);

        this.data=res;
        // console.log(this.data.data.seasonal_theme_daily.length==undefined);
        // console.log(this.data.data.seasonal_theme_daily==undefined);
      
        this.seasonalThemeDaily1=this.data.data.seasonal_theme_daily
        this.seasonalThemeWeekly2=this.data.data.seasonal_theme_weekly;
        this.seasonalThemeMonthl3=this.data.data.seasonal_theme_monthly
        console.log( this.seasonalThemeDaily1==undefined);
          
        this.seasonalThemeDailyBadges1=this.data.data.seasonal_theme_daily_badge_details;
        this.totalTargetScore=Number(this.seasonalThemeDailyBadges1[0].seasonal_score_target)+Number(this.seasonalThemeDailyBadges1[1].seasonal_score_target)+Number(this.seasonalThemeDailyBadges1[2].seasonal_score_target);


        this.seasonalThemeWeeklyBadges2=this.data.data.seasonal_theme_weekly_badge_details;
        this.totalTargetScoreForWeekly=Number(this.seasonalThemeWeeklyBadges2[0].seasonal_score_target)+Number(this.seasonalThemeWeeklyBadges2[1].seasonal_score_target)+Number(this.seasonalThemeWeeklyBadges2[2].seasonal_score_target);

        this.seasonalThemeMonthlyBadges3=this.data.data.seasonal_theme_monthly_badge_details;
        this.totalTargetScoreForMontly=Number(this.seasonalThemeMonthlyBadges3[0].seasonal_score_target)+Number(this.seasonalThemeMonthlyBadges3[1].seasonal_score_target)+Number(this.seasonalThemeMonthlyBadges3[2].seasonal_score_target);

        this.seasonalThemeDailyBadges1.forEach((res)=>{
          if(res.active_class == '1'){
            this.dailyBadgesActive=true;
          }
        })

        this.seasonalThemeWeeklyBadges2.forEach((res)=>{
          if(res.active_class == '1'){
            this.weeklyBadgesActive=true;
          }
        })

        this.seasonalThemeMonthlyBadges3.forEach((res)=>{
          if(res.active_class == '1'){
            this.monthlyBadgesActive=true;
          }
        })
        
        // Champions League Data
        this.onGoingChallenges=this.data.data.challenge_list;
        this.challengeReacieved=this.data.data.new_challenge_list;

        console.log(this.onGoingChallenges)

        // Trivia Corner Data

        this.triviaCornerData=this.data.data.trivia_corner;

        this.triviaCornerData.forEach((res)=>{
          console.log(true)
          if(res.view_status!='Read')
          {
            this.hideTriviaIndicator=true;
            // console.log(hideTriviaIndicator)
          }
        })
      })
    

  }

  openDailyModal() {
    this.isDailyModalopen = true;
    this.isWeeklyModalOpen = false;
    this.isMonthlyModalOpen = false;

  }
  openWeeklyModal() {
    this.isDailyModalopen = false;
    this.isWeeklyModalOpen = true;
    this.isMonthlyModalOpen = false;

  }
  openMonthlyModal() {
    this.isDailyModalopen = false;
    this.isWeeklyModalOpen = false;
    this.isMonthlyModalOpen = true;

  }
  



  navigateToBriefQuetion(data:any){
    console.log(data);
    let id_coroebus_team='0';
    console.log(data._game,data._userid,id_coroebus_team,data._categoryid,data.id_learning_academy_brief,data._subcategoryid,data.brief_type);
    console.log(data.id_learning_academy_brief);
    
     console.log('http://localhost:4200/#/LearningAcademy/library_game='+data._game+"&_userid="+data._userid+"&_team="+id_coroebus_team+"&_categoryid="+data._categoryid+"&_briefid="+data.id_learning_academy_brief+"&_subcategoryid="+data._subcategoryid+"&brief_type="+data.brief_type);
  
     if(data.view_status!='Read'){
      window.open(
        'https://coroebus.in/Learning_academy/#/LearningAcademy/library?_game='+data._game+"&_userid="+data._userid+"&_team="+id_coroebus_team+"&_categoryid="+data._categoryid+"&_briefid="+data.id_learning_academy_brief+"&_subcategoryid="+data._subcategoryid+"&brief_type="+data.brief_type,
    
       '_self'
     )
     }
    else{
      this.modalService.dismissAll('Cross click')
      Swal.fire({
        title: '',
        text: 'Answer is Already Given',
        // imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: '#556ee6'
      });
    }
    }
  

  
}