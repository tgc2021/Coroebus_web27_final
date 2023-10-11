import { Component, ElementRef, OnInit ,ViewChild, ViewEncapsulation} from '@angular/core';
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
import Swal from 'sweetalert2';
import { MatSnackBar } from "@angular/material/snack-bar";  

import { ImagecropperComponent } from '@pages/imagecropper/imagecropper.component';

@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'app-top-hierarchy-dashboards',
  templateUrl: './top-hierarchy-dashboards.component.html',
  styleUrls: ['./top-hierarchy-dashboards.component.scss']
})

export class TopHierarchyDashboardsComponent implements OnInit {
  counter: any = 0
  panelOpenState = false;
  isactive: boolean 
  id_role_check:any
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
  leaderboard_data_popup:any
  leaderboard_data_buttons:any
  i:any=1
  spectSearchStr:any=''
  spectSearchStrTrigger: boolean = false
  activeTabOrderNumberForSectionView_2: any
  spectSearList: any
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
  lengthLeaderBoardData: any;
  about_game_pdf:any
  lengthSearchList: number;
  pokeId: any;
  pokeslidedata :any= [];
  pokeInterval: any;
  updatedata: any;
  arrowStatus: any
  pokeRowData: any
  pokeErr: any
  clicked = 0;
  @ViewChild('content') content;
  @ViewChild('pokeList') pokeList;
  @ViewChild('hierarchyPopup') hierarchyPopup;
  @ViewChild('pokeDangerTpl') pokeDangerTpl;
  emojiText: any;
  idSelected: any;
  pockdata: any;
  emoji: any;
  pokeidselected: any;
  hierarchyPopupList: any
  firstUserData: any;
  nodatasearch:any
  subActiveClass:boolean;
  mylabel:any;
  subActiveClassOverall: boolean=true;
  id_role: any;
  sec_que: any=[];
  primary_rank: any;
  sectionView_3_popup: any;
  sectionView_3_list_popup: any;
  sectionView_3_list_popup_index: any;

  tl_team_rank: string;
  sectionView_2_err: string;
  sectionView2ResponsePopup: void;
  activeClassPopup: any;
  openKpi: boolean;
  kpiData: any;
  labelArray: any=[];
  newKpiNamefirst: any;
  fullFormKpiNamefirst: any;
  newKpiNameSecond: any;
  fullFormKpiNamesecond: any;
  newKpiNameThird: any;
  fullFormKpiNameThird: any;
  newKpiNameFourth: any;
  fullFormKpiNameFourth: any;
  endRangeForFirst: any;
  endRange: boolean=false;
  endRangeForSecond: any;
  endRangeSecond: boolean=false;
  endRangeForThird: any;
  endRangeThird: boolean=false;
  endRangeForFourth: any;
  endRangeFourth: boolean=false;
  selectedIndex:any=0;
  labelFirst: any;
  labelSecond: any;
  labelThird: any;
  labelFourth: any;
  groupID: any;
  groupID_bh: string;
  gameIdBh: string;
  id_role_bh: string;
  constructor(private readonly store: Store, public _route: ActivatedRoute,public snackBar: MatSnackBar,public router:Router, public Util: Util,public http:ApiserviceService,private eventService: EventService,public element: ElementRef,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.tl_team_rank=localStorage.getItem('tl_rank')
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }



    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)


    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)

    this.light_color=localStorage.getItem('light_color');
    
    this.element.nativeElement.style.setProperty('--lightColor', `${this.light_color}`)

   
    this.activeClass=0
    // this.subActiveClass=true;
    this.subActiveClassOverall=true;
    
    
    // this.isactive = true

    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
    
      

      this._routeSub?.unsubscribe()
      this._routeSub = this._route.queryParams.subscribe(queryParams => {
        // do something with the query params
        if (queryParams?.userID) {
          
          this.location = window.location.href
          if (this.location.includes("?")) {
            this.cameraimage=false
            var replacedUserId = queryParams?.userID.replace(/ /g, '+');
            

            var replacedGameId = queryParams?.gameID.replace(/ /g, '+');
            

            var replacedRoleId = queryParams?.roleID.replace(/ /g, '+');
            
            queryParams = { userID: this.Util.decryptData(replacedUserId), gameID: this.Util.decryptData(replacedGameId), roleID: this.Util.decryptData(replacedRoleId) }

          }
          else {
            queryParams = { userID: this.Util.decryptData(queryParams?.userID), gameID: this.Util.decryptData(queryParams?.gameID), roleID: this.Util.decryptData(queryParams?.roleID) }

          }
          this.queryParams = queryParams
          



          this.getUserBannerDataSectionView_1(queryParams)
        
          // this.getUserBannerDataSectionView_2(queryParams)
          this.getUserBannerDataSectionView_3(null, queryParams)
           this.GetIndexWisePopup(queryParams);
          // this.GetRankingPopupData()
         
          // this.notificationList()
          // this.addIns()
        } else {
          this.getUserBannerDataSectionView_1()
          this.getUserBannerDataSectionView_3()
        
          // this.getUserBannerDataSectionView_2()
          this.getUserBannerDataSectionView_3()
          this.GetRankingPopupData()
          
          // this.notificationList()
          // this.addIns()

        }
      });


    })

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)

    this.medium_color=localStorage.getItem('medium_color')
    this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)
    
  
    this.leaderboard(0);

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
        
        
      })

      this.sectionView_1 = res?.data;
      this.openKpiInfo('');
      localStorage.setItem('id_role_hos',this.sectionView_1._personal_data?.id_role)
      this.primary_rank =this.sectionView_1._primary.primary_rank;
      
      localStorage.setItem('bg_image',this.sectionView_1?.theme_details?.[0]?.point_dist_background)

      
      

      if(this.sectionView_1?.is_about_game==1){
        this.about_game_pdf= this.sectionView_1?.about_game[0]?.file_name
        
        localStorage.setItem('about_game_pdf',this.about_game_pdf)
      }

      this.pokeAnimationData = this.sectionView_1._poked_data
      // this.pokeAnimationData1=this.sectionView_1._poked_data[0].poke_description
      this.updatedPoke()
     

      
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.getBackImagesFromSectionView1 = this.sectionView_1._back_images[1]._data;

      this.getBackImages.push(...this.getBackImagesFromSectionView1);


      
      
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // alert(this.pokeAnimationData)

      this.rewardPoints = this.sectionView_1?._points?.filter(data => data?.label === 'Reward Point')
      //this.gamePoints = this.sectionView_1?._points?.filter(data => data?.label === 'Tribe Point' ? data?.label === 'Tribe Point' : data?.label === 'Game Point')
      this.gamePoints = this.sectionView_1?._points?.filter(data => data?.type === 'comp-point')
      document.body.classList.add('dashboard-bg-image');
      const bgImg = this.Util?.isMobile() ? this.sectionView_1?.theme_details?.[0]?.theme_background : this.sectionView_1?.theme_details?.[0]?.theme_background_web
      document.body.style.backgroundImage = 'url(' + bgImg + ')'

      this.web_profile_back_image= this.sectionView_1._back_images[1]._data[0].ranking_image_profile;
      
      
     
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
  updatedPoke() {
    
  
    if (this.pokeAnimationData.length > 0) {
      let i = 0;
  
      const intervalId = setInterval(() => {
        this.pokeslidedata.push(this.pokeAnimationData[i]);
        
  
        setTimeout(() => {
          this.pokeslidedata.pop();
        
        }, 5000); // Remove the last element after 5 seconds'
        this.updatePokeData(this.pokeAnimationData[i].poke_id_log);
        i++;
        if (i === this.pokeAnimationData.length) {
          clearInterval(intervalId);
         
          // this.pokeAnimationData=[]
            setTimeout(()=>{
          // (<HTMLInputElement>document.getElementById('animationPoke')).style.background = "none";
            this.getUserBannerDataSectionView_1()
            },5000)
        }
  
      }, 6000);
      
  
    } else {
      clearInterval(this.pokeInterval);
      this.pokeAnimationData=[]
  
    }
  
    
  }
  async getUserBannerDataSectionView_3(viewMore?: any, queryParams?: any) {
    this.id_role_check=localStorage.getItem('id_role_hos')
    

    
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
       

        if(this.id_role_check!=9){
          
          
          this.leaderboard_data=this.sectionView_3?._ranking_data[0]._Overall;
          this.leaderboard_data_popup=this.sectionView_3?._ranking_data[0]._Overall
          this.lengthLeaderBoardData=this.leaderboard_data?.length;
          
          this.leaderboard_data_buttons=this.sectionView_3?._ranking_data;
          
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[0]?.order;
        }
        else{
         

          this.leaderboard_data=this.sectionView_3?._ranking_data[0]._data;
          this.leaderboard_data_popup=this.sectionView_3?._ranking_data[0]?._data
          this.lengthLeaderBoardData=this.leaderboard_data?.length;
          
          this.leaderboard_data_buttons=this.sectionView_3?._ranking_data;
          
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[0].order;
        
        }
      


      } else {

        if(this.id_role_check!=9){

          this.sectionView_3 = res?.data
          
          this.leaderboard_data=this.sectionView_3?._ranking_data[0]?._Overall;
          this.leaderboard_data_popup=this.sectionView_3?._ranking_data[0]?._Overall
  
    
          this.leaderboard_data_buttons=this.sectionView_3?._ranking_data
          
          this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[0]?.order
        }
     else{

      this.sectionView_3 = res?.data
      
      this.leaderboard_data=this.sectionView_3?._ranking_data[0]?._data;
      this.leaderboard_data_popup=this.sectionView_3?._ranking_data[0]?._data

      
      this.leaderboard_data_buttons=this.sectionView_3?._ranking_data
      
      this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[0]?.order;
    
     }

      }
      // this.filterRankingData()

      this.sectionView_3_list = this.sectionView_3?._ranking_data?.filter(data => {
        //
        if (data.order === this.activeTabForSectionView_2) {
          return data
        }
      })
      //
    } else {
      this.sectionView_3_err = 'Please try after some time'
    }
  }
  

  upDownArrow(arrowStatus: string, rowData: any) {
    // alert('TODO: Add Poke popup-> ' + arrowStatus)
   
    if (rowData?.userid !== this.userSelectionData?._personal_data?.USERID) {
      let roleCheckArray = this.Util.pokeMapping()
      if (this.queryParams?.roleID) {
        
        // roleCheckArray = roleCheckArray?.filter(data => data?.roleID === this.sectionView_1?._personal_data?.id_role)
        roleCheckArray = roleCheckArray?.filter(data => data?.roleID === this.queryParams?.roleID)
    
        
      } else {
        roleCheckArray = roleCheckArray?.filter(data => data?.roleID === this.userSelectionData?._personal_data?.id_role)
  
        
      }
    
      
      if (roleCheckArray?.[0]?.canPokeTo?.indexOf(rowData?.id_role) > -1) {
        this.pokeRowData = rowData
       

        this.arrowStatus = arrowStatus === 'red' ? 'Motivation' : 'Positive'
       
        this.emojiSelected(0, this.arrowStatus)

        this.modalService.open(this.pokeList, { centered: true, windowClass: 'modal-cls' })

      } else {
        // this.toastService.show(this.pokeDangerTpl, { classname: '', delay: 1500, });
        this.pokeErr = `Role id ${this.queryParams?.roleID ? this.queryParams?.roleID : this.userSelectionData?._personal_data?.id_role} can't pokes to role id ${rowData?.id_role}`
        console.warn(`Role id ${this.queryParams?.roleID ? this.queryParams?.roleID : this.userSelectionData?._personal_data?.id_role} can't pokes to role id ${rowData?.id_role}`)
      }

    }
  }
  emojiSelected(id, event) {
    // $('.emojiBackgroundButton').removeClass('acrtive')

    this.clicked = id
    

    this.emojiText = this.pokeData
    

    this.idSelected = event === 'Positive' ? 0 : 1
   

    this.pokeidselected = this.emojiText[this.idSelected]._data[id].poke_description
    this.emoji = this.emojiText[this.idSelected]._data[id].poke_description
    
    this.pokeId = this.emojiText[this.idSelected]._data[id].id_coroebus_poke
   
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
      "_userid": this.userSelectionData?._personal_data?.USERID,
      "_team": this.userSelectionData?._personal_data?.id_coroebus_team,
      "_game": this.userSelectionData?._personal_data?.id_coroebus_game,
      "_id_user_poked": this.pokeRowData?.id_coroebus_user,
      "_pokeid": this.pokeId
    };
    [err, res] = await HttpProtocols.to(DashboardModel.pokeSelection(body))
    if (!err && res?.statuscode === 200) {
      modal?.dismiss('Cross click')
      Swal.fire({
        title: '',
        text: res?.message,
        // imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor: this.sectionView_1?.theme_details?.[0]?.dark_color
      });
    } else {
      this.notificationList_err = 'Error'
    }
  }
  updatePokeData(data: any) {
    

    let body = {
      '_pokeid': data
    }
    this.http.updatePoke(body).subscribe((res) => {
    
      
      this.updatedata=res
      if (this.updatedata.statuscode === 200) {
    
      } else {
  
      }
      
      // this.getUserBannerDataSectionView_1()
    })
    // clearInterval(this.pokeInterval);
    // this.pokeslidedata=[]

    
  }

  navigateToSMDashboard(index:any){

    this.spectSearchStr=''

    
    this.spectator="spectator"
    
    this.sm_user_id=this.Util.encryptData(index.userid)
    // this.game_ID_sm=localStorage.getItem('gameId')
    this.sm_game_id=this.Util.encryptData(index.id_coroebus_game)
    this.sm_role_id=this.Util.encryptData(index.id_role)

    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[3]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)
    

    if(this.overall_role_id==8 || this.overall_role_id==12){
      this.router.navigateByUrl('/top_dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

    }
else{
  this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

}
  }
 

  navigateToRMDashboard(index:any){
    

    this.sm_user_id=this.Util.encryptData(index.userid)
    // this.game_ID_sm=localStorage.getItem('gameId')
    this.sm_game_id=this.Util.encryptData(index.id_coroebus_game)
    this.sm_role_id=this.Util.encryptData(index.id_role)
  
    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[2]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)

this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)
  }

  navigateToSearchSMDashboard(index:any){
    this.spectSearFinalList=Array.of(this.spectSearList)
    
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
    
    this.spectSearFinalList1=this.spectSearFinalList[0]

    this.sm_user_id=this.Util.encryptData(this.spectSearFinalList1[index].userid)
    this.game_ID_rm=localStorage.getItem('gameId')

    this.sm_game_id=this.Util.encryptData(this.game_ID_rm)
    this.sm_role_id=this.Util.encryptData(this.spectSearFinalList1[index].id_role)

    // this.sm_role_id=this.Util.encryptData(this.sectionView_3._ranking_data[2]._data[index].id_role)
    this.overall_role_id=this.Util.decryptData(this.sm_role_id)

this.router.navigateByUrl('/dashboard?userID='+this.sm_user_id +"&gameID="+  this.sm_game_id +"&roleID="+  this.sm_role_id)

  }
  getGraphDataById() {
    // 
    let obj = {
      _userid: this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,

      game_id: this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    }
    

    let body={
      "_userid": this.userSelectionData?._personal_data?.USERID,
      "_game":this.userSelectionData?.id_coroebus_game,
      _device:"W",
      _section:"Performance",
      _description: "From Points Distribution"
    }
  
  
    this.http.engagamentlog(body).subscribe(res=>{
      
      
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
    
    
    
    
    let obj = {
      _userid: this.queryParams?.userID ? this.queryParams?.userID : this.userSelectionData?._personal_data?.USERID,

      game_id: this.queryParams?.gameID ? this.queryParams?.gameID : this.userSelectionData?.id_coroebus_game
    }
    

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
  
   this.spectSearchStr=null
 
  this.activeTabOrderNumberForSectionView_2 = this.sectionView_3?._ranking_data?.[event].order

  
 
   
   this.activeClass=event;
   
   this.activeClass=event;
    // this.subActiveClass=0
    

   this.myLeaderboard()
   
 
   
  }

  myLeaderboard(event:any=0){
  
    this.leaderboard_data=this.sectionView_3?._ranking_data[ this.activeTabOrderNumberForSectionView_2-1]?._data;
    this.leaderboard_data_popup=this.sectionView_3?._ranking_data[ this.activeTabOrderNumberForSectionView_2-1]?._data;

   
    this.subActiveClass=true;
    this.subActiveClassOverall=false;
  }
  overallLeaderboard(event:any=0){
    this.leaderboard_data=this.sectionView_3._ranking_data[ this.activeTabOrderNumberForSectionView_2-1]._Overall;
    this.subActiveClass=false;
    this.subActiveClassOverall=true;

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
        
        
      })
      
    }
   
    this.userSelectionData
  }
 
  viewMore(){
    this.pageNumberForSectionView_3 = this.pageNumberForSectionView_3 + 1
    
    
    this.getUserBannerDataSectionView_3(1,this.queryParams)
  }
 


  checkEmpty(){
    this.spectSearList=null

    if(this.spectSearchStr==''){
      
      this.spectSearchStr=''
      this.emptyInput==true;
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
      

    if(res.data==''){
      
      // this.openSnackBar('No data Available','Ok')

      // Swal.fire({
      //   title: '',
      //   text:'No data Available',
      //   imageUrl: 'assets/images/svg/logo/logo.svg',
      //   imageHeight: 40,
      //   confirmButtonColor: '#556ee6'
      // });

      Swal.fire({
        title: '',
        text:'No data Available',
        // imageUrl: 'assets/images/svg/logo/logo.svg',
        imageHeight: 40,
        confirmButtonColor:  this.sectionView_1.theme_details[0].dark_color
      });

    }
    else{
      this.spectSearList = res?.data[0]._data;
      
      
  

      this.lengthSearchList=this.spectSearList.length;
      
    // this.spectSearFinalList=this.spectSearList._data
      this.searchbgimage= this.spectSearList[0]
      this.search_bg_tile_image=this.searchbgimage._data
      

      this.search_bg_tile_image.map(res=>{
       
        this.final_web_tile_image=res
        
        
        

        this.getBackImagesFromSectionView1.map(res=>{
          
          this.section1_tile_images=res
          
          
          
          if(this.final_web_tile_image.ranking_image_level == this.section1_tile_images.ranking_image_level){
            
            
           this.web_tile_img= this.section1_tile_images.ranking_image
            
            
           }

           


        })
        
         
    
      })
    }
      
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Dashboard",
        _description:"Search"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        
        
      })

     

    } else {
      this.notificationList_err = 'Error'
    }

 
  }

  getDataBasedOnUserID(data: any) {
    // 
    localStorage.setItem('id_role_hos','9')
this.spectSearchStr=''
    
    if(data.role_id==8||data.role_id==9){
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

    else{
      
      this.router.navigate(['/dashboard'], {
        relativeTo: this._route,
        queryParams: {
          userID: this.Util.encryptData(data?._userid),
          gameID: this.Util.encryptData(data?.game_id),
          roleID: this.Util.encryptData(data?.role_id?.toString())
  
        },
  
        // queryParamsHandling: 'merge',
        // preserve the existing query params in the route
        // skipLocationChange: false
        // do not trigger navigation
  
  
      });
    }
   



  }

  getDataBasedOnUserIDHos(data: any) {
    
    localStorage.setItem('userid',data.USERID)

    this.router.navigate(['/topdashboard'], {
      relativeTo: this._route,
      queryParams: {
        userID: this.Util.encryptData(data?.USERID),
        // gameID: this.Util.encryptData(data?.game_id),
        // roleID: this.Util.encryptData(data?.role_id?.toString())
       
      },
     
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      // skipLocationChange: false
      // do not trigger navigation

    });

   

  }
  governance_index(){
    
    
    this.router.navigateByUrl('governance_index');
  }

  async openHierarchyPopup(data?: any) {
    
    let err: any, res: any;
    let body: any;
    
    body = {
      "_userid": data?.userid,
      "_game": data?.id_coroebus_game
    };
    [err, res] = await HttpProtocols.to(DashboardModel.hierarchyPopup(body))
    if (!err && res?.statuscode === 200) {
      this.hierarchyPopupList = res?.data
      this.firstUserData = this.hierarchyPopupList[0]
      

      

      this.modalService.open(this.hierarchyPopup, { centered: true, windowClass: 'modal-cls' });
    } else {
      // this.levelsBucketsList_err = 'Error'
    }
    
  }

  async GetIndexWisePopup(event:any){
    
     
    this.activeClassPopup=event;
  
   
  
    let err1: any, res1: any;
    let body1: any;
    
    body1 = {
      "_userid": this.sectionView_1?.is_land_logos[0]?._userid,
      "_game":this.sectionView_1?.is_land_logos[0]?.game_id,
      "_section_view": "2", "page_number": "1"
    };
    [err1, res1] = await HttpProtocols.to(DashboardModel.getCenterDataSectionView_2(body1))
    if (!err1 && res1?.status === 'success' && res1?.statuscode === 200) {
      
      this.sectionView2ResponsePopup=res1?.data?._ranking_data;
      this.activeTabOrderNumberForSectionView_2 = res1?.data?._ranking_data?.[event]?.order
      
     
      this.queryParams = { userID:  this.sectionView_1?.is_land_logos[0]?._userid, gameID: this.sectionView_1?.is_land_logos[0].game_id, roleID:  this.sectionView_1?.is_land_logos[0]?.role_id}

      let err: any, res: any;
      let body: any;
      
      
      body = {
        "_userid": this.sectionView_1?.is_land_logos[0]?._userid,
        "_game": this.sectionView_1?.is_land_logos[0]?.game_id, "_section_view": "3", "page_number": this.pageNumberForSectionView_3
      };
      // localStorage.setItem('body_userid', body._userid);
      // localStorage.setItem('body_game', body._game);
  
      [err, res] = await HttpProtocols.to(DashboardModel.getRankingAndOtherDataSectionView_3(body))
      if (!err && res?.status === 'success' && res?.statuscode === 200) {
      
     
  
       
          this.sectionView_3_popup = res?.data;

          
      
          
           
          this.sectionView_3_list_popup_index = this.sectionView_3_popup?._ranking_data?.filter(data => {
            
            
            
            
            
            if (data.order === this.activeTabOrderNumberForSectionView_2) {
             
              return data
             
             
            }
           
            data?._data.find((res)=>{
            
              if(res?.userid===this.sectionView_1._personal_data.USERID){
                localStorage.setItem("group_id",res?.id_coroebus_group);
               
              }
            })

          })
         
           
        
        // this.filterRankingData()
  
        // this.sectionView_3_list_popup = this.sectionView_3_popup?._ranking_data
        //
      } else {
        this.sectionView_3_err = 'Please try after some time'
      }
    }
    else {
      this.sectionView_2_err = 'Please try after some time'
    }
     
   }
   async openKpiInfo(event) {

    this.selectedIndex=0;

    let body = {
        "_userid": this.sectionView_1?._personal_data?.USERID,
        "_game": this.sectionView_1?._personal_data?.id_coroebus_game, "_section_view": "3", "page_number": this.pageNumberForSectionView_3
      };
    if(this.sectionView_1?._personal_data?.id_role=='8'){
      let err: any, res: any; 
    [err, res] = await HttpProtocols.to(DashboardModel.getRankingAndOtherDataSectionView_3(body))
     if (!err && res?.status === 'success' && res?.statuscode === 200) {
       this.sectionView_3_popup = res?.data;
       this.sectionView_3_list_popup_index = this.sectionView_3_popup?._ranking_data?.filter(data => {
        
         if (data.order === this.activeTabOrderNumberForSectionView_2) {
           return data
         }
       
         localStorage.setItem("group_id", data._data[0]?.id_coroebus_group);
       

       })
     } else {
       this.sectionView_3_err = 'Please try after some time'
     }
    }
    else if(this.sectionView_1?._personal_data?.id_role=="9"){
      
      
      let body={
        _userid:this.sectionView_1?._business_user[0]?.USERID,
        _org:this.sectionView_1?._business_user[0]?.id_coroebus_organization
      }
      this.http.buisnessHead(body).subscribe((res:any)=>{
      
        res?.data?._ranking_data[0]?._data.map((res:any)=>{
        
          if (res?.userid == this.sectionView_1?._personal_data?.USERID){
            
             this.primary_rank=res?.rankingtable_number;
            localStorage.setItem("group_id_bh",res?.id_coroebus_group);
            localStorage.setItem("gameId_bh",res?.id_coroebus_game);
            localStorage.setItem("idRole_bh",res?.id_role);
            
          
          }

        })
        
      })
    }
    this.groupID=localStorage.getItem('group_id')
    this.groupID_bh=localStorage.getItem('group_id_bh')
    this.gameIdBh=localStorage.getItem('gameId_bh');

   
    this.id_role_bh=localStorage.getItem('idRole_bh')
    this.openKpi = !this.openKpi;
   
    try {
      var location = window.location.href;
      
      if(this.sectionView_1?._personal_data?.id_role=='8'){
        if (location.includes("?")){
          let body = {
            _game:this.sectionView_1?._personal_data?.id_coroebus_game,
            id_role:this.sectionView_1?._personal_data?.id_role,
            id_coroebus_group:this.groupID
          };
          let res = await this.http.pointDistributionPopup(body).toPromise();
          this.kpiData = res;
        }
        else{
          
          let body = {
      
            _game:this.userSelectionData?.id_coroebus_game,
            id_role:this.userSelectionData?._personal_data?.id_role,
            id_coroebus_group:this.groupID
    
          };
          let res = await this.http.pointDistributionPopup(body).toPromise();
          this.kpiData = res;
         
        }
      }
      else if(this.sectionView_1?._personal_data?.id_role=='9'){
        if (location.includes("?")){
          let body = {
            _game:this.gameIdBh,
            id_role:this.queryParams?.roleID,
            id_coroebus_group:this.groupID_bh
          };
          let res = await this.http.pointDistributionPopup(body).toPromise();
          this.kpiData = res;
        }
        else{
         
          let body = {
      
            _game:this.gameIdBh,
            id_role:this.id_role_bh,
            id_coroebus_group:this.groupID_bh
    
          };
          let res = await this.http.pointDistributionPopup(body).toPromise();
          this.kpiData = res;
         
        }
      }

      

      this.labelArray = Object.entries(this.kpiData?.data?._point_details).map(
        ([label, otherKpiData]) => {
          return { label, Kpidata: otherKpiData };
        }
      );
     

    
      this.endRangeForFirst=this.labelArray[0]?.Kpidata?.data.forEach(element => {
        if(element.kpi_type=='Actual'){
          this.endRange=true;
        }
        else{
          this.endRange=false;

        }
        
      });
      // First Index
     this.newKpiNamefirst=this.labelArray[0]?.Kpidata?.data[0]?.kpi_name.split(" ").pop();
     this.newKpiNamefirst=this.labelArray[0]?.Kpidata?.data[0]?.kpi_name?.replace(this.newKpiNamefirst,"");
     this.labelFirst=this.labelArray[0]?.label?.replace('- rollup','');
     this.fullFormKpiNamefirst=`${this.newKpiNamefirst}${this.labelFirst} Index`;
    

      // Second Index
      this.endRangeForSecond=this.labelArray[1]?.Kpidata?.data.forEach(element => {
        if(element.kpi_type=='Actual'){
          this.endRangeSecond=true;
        }
        else{
          this.endRangeSecond=false;

        }
      });
      this.newKpiNameSecond=this.labelArray[1]?.Kpidata?.data[0]?.kpi_name.split(" ").pop();
      this.newKpiNameSecond=this.labelArray[1]?.Kpidata?.data[0]?.kpi_name?.replace(this.newKpiNameSecond,"");
      this.labelSecond=this.labelArray[1]?.label?.replace('- rollup','');
      this.fullFormKpiNamesecond=`${this.newKpiNameSecond}${this.labelSecond} Index`
     
      // Third Index
      this.endRangeForThird=this.labelArray[2]?.Kpidata?.data.forEach(element => {
        if(element.kpi_type=='Actual'){
          this.endRangeThird=true;
        }
        else{
          this.endRangeThird=false;

        }
      });
      this.newKpiNameThird=this.labelArray[2]?.Kpidata?.data[0]?.kpi_name.split(" ").pop();
      this.newKpiNameThird=this.labelArray[2]?.Kpidata?.data[0]?.kpi_name?.replace(this.newKpiNameThird,"");
      this.labelThird=this.labelArray[2]?.label?.replace('- rollup','');
      this.fullFormKpiNameThird=`${this.newKpiNameThird}${this.labelThird} Index`
      

      // Fourth Index
      this.endRangeForFourth=this.labelArray[3]?.Kpidata?.data.forEach(element => {
        if(element.kpi_type=='Actual'){
          this.endRangeFourth=true;
        }
        else{
          this.endRangeFourth=false;

        }
      });
      this.newKpiNameFourth=this.labelArray[3]?.Kpidata?.data[0]?.kpi_name.split(" ").pop();
      this.newKpiNameFourth=this.labelArray[3]?.Kpidata?.data[0]?.kpi_name?.replace(this.newKpiNameFourth,"");
      this.labelFourth=this.labelArray[3]?.label?.replace('- rollup','');
      this.fullFormKpiNameFourth=`${this.newKpiNameFourth}${this.labelFourth} Index`
      

      
     
    
     

      
    
    } catch (err) {
      console.error(err);
    }
    
  }

  async GetRankingPopupData(){
    
   
    
    this.GetIndexWisePopup(this.activeTabOrderNumberForSectionView_2-1)


}
  getDataBasedOnUserIDVIAhierarchyPopupList(data: any, modal: any) {
    modal.dismiss('Cross click')
    let obj = {
      _userid: data?.USERID,
      game_id: data?.id_coroebus_game,
      role_id: data?.id_role
    }
    
    this.getDataBasedOnUserID(obj)
  }

  ngAfterViewInit():void{
    setTimeout(()=>{
      this.leaderboard(0);
    
     
      
    },2000)

   

    
   
    
  }
  
 
}

