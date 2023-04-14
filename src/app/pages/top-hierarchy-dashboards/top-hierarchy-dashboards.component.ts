import { Component, ElementRef, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Util } from '@app/utils/util';
import { HttpProtocols } from '@app/http/http.protocols';
import { DashboardModel } from '@models/dashboard.model';
import { ApiserviceService } from 'app/apiservice.service';
import { EventService } from '@app/services/event.service';
import * as userActions from '../../core/app-state/actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ImagecropperComponent } from '@pages/imagecropper/imagecropper.component';

@Component({
  selector: 'app-top-hierarchy-dashboards',
  templateUrl: './top-hierarchy-dashboards.component.html',
  styleUrls: ['./top-hierarchy-dashboards.component.scss']
})

export class TopHierarchyDashboardsComponent implements OnInit {
  counter: any = 0
  panelOpenState = false;
  isactive: boolean 
  combineLatest: Subscription
  userSelectionData: any
  _routeSub: Subscription
  location: any
  queryParams: any
  sectionView_1:any
  pokeAnimationData:any
  getBackImagesFromSectionView1: any
  getBackImages: any = [];
  rewardPoints:any
  gamePoints:any
  web_profile_back_image: any;
  sectionView_1_err:any
  pokeData: any;
  sectionView_3: any;
  scrollTarget: any;
  sectionView_3_list: any;
  activeTabForSectionView_2: any;
  sectionView_3_err: string;
  dark_color:any
  medium_color:any
  activeClass:any
  pageNumberForSectionView_3: number = 1
  cameraimage:boolean=true
  spectator: any;
  sm_user_id:any;
  sm_game_id:any;
  sm_role_id:any;
  overall_role_id:any
  game_ID_sm:any
  game_ID_rm:any
  leaderboard_data:any
  leaderboard_data_buttons:any
  i:any=0
  spectSearchStr:any=''
  spectSearchStrTrigger: boolean = false
  activeTabOrderNumberForSectionView_2: any
  spectSearList: string
  searchbgimage:any
  search_bg_tile_image: any;
  final_web_tile_image: any;
  section1_tile_images: any;
  web_tile_img: any;
  notificationList_err: string;
  spectSearFinalList:any=[]
  spectSearFinalList1:any
  light_color: any;
  isVideoHide: any;
  emptyInput: boolean=true;
  constructor(private readonly store: Store, public _route: ActivatedRoute,public router:Router, public Util: Util,public http:ApiserviceService,private eventService: EventService,public element: ElementRef,private modalService: NgbModal) { }

  ngOnInit(): void {
  
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }



    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
console.log(this.dark_color);

    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

    this.light_color=localStorage.getItem('light_color')
    this.element.nativeElement.style.setProperty('--lightColor', `${this.light_color}`)

    console.log(this.medium_color);

    this.activeClass=0

    // this.isactive = true

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      console.log(login, theme, game)
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      console.log(this.userSelectionData);

      this._routeSub?.unsubscribe()
      this._routeSub = this._route.queryParams.subscribe(queryParams => {
        // do something with the query params
        console.log(queryParams?.userID);
        if (queryParams?.userID) {
          console.log(window.location.href);
          this.location = window.location.href
          if (this.location.includes("?")) {
            this.cameraimage=false
            var replacedUserId = queryParams?.userID.replace(/ /g, '+');
            console.log(replacedUserId);

            var replacedGameId = queryParams?.gameID.replace(/ /g, '+');
            console.log(replacedGameId);

            var replacedRoleId = queryParams?.roleID.replace(/ /g, '+');
            console.log(replacedRoleId);
            queryParams = { userID: this.Util.decryptData(replacedUserId), gameID: this.Util.decryptData(replacedGameId), roleID: this.Util.decryptData(replacedRoleId) }

          }
          else {
            queryParams = { userID: this.Util.decryptData(queryParams?.userID), gameID: this.Util.decryptData(queryParams?.gameID), roleID: this.Util.decryptData(queryParams?.roleID) }

          }
          this.queryParams = queryParams
          console.log(this.queryParams);



          this.getUserBannerDataSectionView_1(queryParams)
          // this.getUserBannerDataSectionView_2(queryParams)
          this.getUserBannerDataSectionView_3(null, queryParams)
         
          // this.notificationList()
          // this.addIns()
        } else {
          this.getUserBannerDataSectionView_1()
          this.getUserBannerDataSectionView_3()
          // this.getUserBannerDataSectionView_2()
          this.getUserBannerDataSectionView_3()
          // this.notificationList()
          // this.addIns()

        }
      });


    })

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)

    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

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
      console.log(res);
      
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
      console.log(this.sectionView_1._points[0].score);
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

  async getUserBannerDataSectionView_3(viewMore?: any, queryParams?: any) {
    console.log(viewMore);
    
    console.log(queryParams);
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game, "_section_view": "3", "page_number": this.pageNumberForSectionView_3
    };
    [err, res] = await HttpProtocols.to(DashboardModel.getRankingAndOtherDataSectionView_3(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      
      this.pokeData = res?.data?._poke_list
      
      if (viewMore) {
        res?.data?._ranking_data?.forEach((element, index) => {
          if (element?.label === this.sectionView_3?._ranking_data[index]?.label) {

            if (element?._data?.length > 0) {
              this.sectionView_3?._ranking_data[index]?._data?.push(...element?._data)
              this.scrollTarget?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "end", inline: 'center' });
            }
          }

        });
        console.log(this.spectSearchStr);
        
        this.leaderboard_data=this.sectionView_3?._ranking_data[0]._data
        console.log(this.leaderboard_data);
        this.leaderboard_data_buttons=this.sectionView_3?._ranking_data
        this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[0].order


      } else {
        console.log(this.spectSearchStr);

        this.sectionView_3 = res?.data
        this.leaderboard_data=this.sectionView_3?._ranking_data[0]._data
        this.leaderboard_data_buttons=this.sectionView_3?._ranking_data
        console.log(this.leaderboard_data);
        this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[0].order

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


  navigateToSMDashboard(index:any){

    console.log(index);
    
    this.spectator="spectator"
    
    this.sm_user_id=this.Util.encryptData(index.userid)
    // this.game_ID_sm=localStorage.getItem('gameId')
    this.sm_game_id=this.Util.encryptData(index.id_coroebus_game)
    this.sm_role_id=this.Util.encryptData(index.id_role)

    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[3]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)
    console.log(this.overall_role_id);

    if(this.overall_role_id==8 || this.overall_role_id==12){
      this.router.navigateByUrl('/top_dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

    }
else{
  this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

}
  }
 

  navigateToRMDashboard(index:any){
    console.log(index);

    this.sm_user_id=this.Util.encryptData(index.userid)
    // this.game_ID_sm=localStorage.getItem('gameId')
    this.sm_game_id=this.Util.encryptData(index.id_coroebus_game)
    this.sm_role_id=this.Util.encryptData(index.id_role)
  
    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[2]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)
console.log(this.overall_role_id);
this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)
  }

  navigateToSearchSMDashboard(index:any){
    this.spectSearFinalList=Array.of(this.spectSearList)
    console.log(this.spectSearFinalList);
    this.spectSearFinalList1=this.spectSearFinalList[0]
    this.sm_user_id=this.Util.encryptData(this.spectSearFinalList1[index].userid)
    this.game_ID_sm=localStorage.getItem('gameId')
    this.sm_game_id=this.Util.encryptData(this.game_ID_sm)
    this.sm_role_id=this.Util.encryptData(this.spectSearFinalList1[index].id_role)

    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[3]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)

    if(this.overall_role_id==8 || this.overall_role_id==12){
      this.router.navigateByUrl('/top_dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

    }
else{
  this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

}
  }

  navigateToSearchRMDashboard(index:any){
    this.spectSearFinalList=Array.of(this.spectSearList)
    console.log(this.spectSearFinalList);
    this.spectSearFinalList1=this.spectSearFinalList[0]

    this.sm_user_id=this.Util.encryptData(this.spectSearFinalList1[index].userid)
    this.game_ID_rm=localStorage.getItem('gameId')

    this.sm_game_id=this.Util.encryptData(this.game_ID_rm)
    this.sm_role_id=this.Util.encryptData(this.spectSearFinalList1[index].id_role)

    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[2]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)
console.log(this.overall_role_id);
this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

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
    this.router.navigate(['/performance/page'], {
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

  getRewards(data:any){
    console.log(data);
    
    console.log('rewards page');
    
    let obj = {
      _userid: this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,

      game_id: this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    }
    console.log(obj)

    localStorage.setItem('rewardid',obj._userid)
  

    // this._router.navigate('/performance/page')
    // this._router.navigate(['/performance/page'], { queryParams: { key: value } })
    this.router.navigate(['/reward/rewardPoints'], {
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

  BackToHome(){
    this.router.navigateByUrl('topdashboard')
  }

  navigateToGovernanceIndex(){
    localStorage.setItem('tid',this.sectionView_1.theme_details[0].id_coroebus_theme)
    localStorage.setItem('orgid',this.sectionView_1._personal_data.id_coroebus_organization)

    this.router.navigateByUrl('governance_index')

  }

  leaderboard(event:any=0){
   console.log(event);
   this.spectSearchStr=null
  //   console.log(this.sectionView_3._ranking_data[event]);
  // this.leaderboard_data_buttons=this.sectionView_3._ranking_data[event]
  this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[event].order

   this.leaderboard_data=this.sectionView_3._ranking_data[event]._data
   console.log(this.leaderboard_data);
   this.activeClass=event
   console.log(this.activeClass);
 
   
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
    // this.getUserBannerDataSectionView_2()
    this.userSelectionData
  }
 
  viewMore(){
    this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
    console.log(this.queryParams);
    
    this.getUserBannerDataSectionView_3(1,this.queryParams)
  }
 


  checkEmpty(){
    this.spectSearList=null

    if(this.spectSearchStr==''){
      
      this.spectSearchStr=''
      this.emptyInput==true;
      this.spectSearchStrTrigger = false
      this.spectSearch()
   
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
    else {

      this.spectSearchStrTrigger = false
    }

    // {"_userid":"C1IPL501","_game":"174", "page_number": "1" , "_uname": "a", "_order": "1", "id_coroebus_measurement" : "0"}

   body = {
      "_userid": this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game,
      "page_number": this.pageNumberForSectionView_3,
      "_uname": this.spectSearchStr,
      "_order": this.activeTabOrderNumberForSectionView_2,
     "id_coroebus_measurement":this.sectionView_3._ranking_data[this.activeClass].id_coroebus_measurement
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

      this.spectSearList = res?.data[0]._data
      console.log(this.spectSearList);
    // this.spectSearFinalList=this.spectSearList._data
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

  getDataBasedOnUserID(data: any) {
    // console.log(data?.role_id)

    this.router.navigate([], {
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

  getDataBasedOnUserIDHos(data: any) {
    // console.log(data?.role_id)

    this.router.navigate(['/topdashboard'], {
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
  governance_index(){
    console.log('gov index');
    
    this.router.navigateByUrl('governance_index');
  }
}
