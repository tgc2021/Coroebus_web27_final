import { Component, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import * as fromRoot from '../../../core/app-state';
import { Store } from '@ngrx/store';
import { filter, take, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbModal,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'app/apiservice.service';
import { Util } from '@app/utils/util';
import { Subscription, combineLatest, Subject, Observable, interval } from 'rxjs';
import * as userActions from '../../../core/app-state/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interactive-dashboard',
  templateUrl: './interactive-dashboard.component.html',
  styleUrls: ['./interactive-dashboard.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class InteractiveDashboardComponent implements OnInit,OnDestroy {
  auto_parts = [
    //Production Cordinates

    // {
    //   "shape": "rect",
    //   "type": "Lerning Academy",
    //   "coords": "6,355,138,406"
    // }, {

    //   "shape": "rect",
    //   "type": "Play Zone",
    //   "coords": "222,354,355,398",
    // }, {
    //   "shape": "rect",
    //   "type": "Jackets",
    //   "coords": "270,448,356,475"
    // }, {
    //   "shape": "rect",
    //   "type": "Gloves",
    //   "coords": "269,485,359,575"
    // }, {
    //   "shape": "rect",
    //   "type": "Winter wear",
    //   "coords": "269,521,357,555"
    // }, {
    //   "shape": "rect",
    //   "type": "3rd umpire",
    //   "coords": "11,672,96,782"
    // }, {
    //   "shape": "rect",
    //   "type": "Booster",
    //   "coords": "278,686,341,784"
    // },
    // {
    //   "shape": "rect",
    //   "type": "PersonalMileStone",
    //   "coords": "151,368,208,414"
    // },
    // {
    //   "shape": "rect",
    //   "type": "angryB",
    //   "coords": "149,376,222,407"
    // },
    // {
    //   "shape": "rect",
    //   "type": "spectr",
    //   "coords": "1,423,271,506"
    // },
    // {
    //   "shape": "rect",
    //   "type": "ChampionsLeague",
    //   "coords": "23,517,105,562"
    // },{
    //   "shape": "rect",
    //   "type": "Daily",
    //   "coords": "275,491,347,518"

    // },
    // {
    //   "shape": "rect",
    //   "type": "Weekly",
    //   "coords": "276,523,348,550"
    // },
    // {
    //   "shape": "rect",
    //   "type": "Monthly",
    //   "coords": "275,557,347,584"
    // }

    // Beta Cordinates

    {
      "shape": "rect",
      "type": "Lerning Academy",
      "coords": "19,344,115,386"
    }, {

      "shape": "rect",
      "type": "Play Zone",
      "coords": "247,346,339,386",
    }, {
      "shape": "rect",
      "type": "Jackets",
      "coords": "270,448,356,475"
    }, {
      "shape": "rect",
      "type": "Gloves",
      "coords": "269,485,359,575"
    }, {
      "shape": "rect",
      "type": "Winter wear",
      "coords": "269,521,357,555"
    }, {
      "shape": "rect",
      "type": "3rd umpire",
      "coords": "21,690,106,782"
    }, {
      "shape": "rect",
      "type": "Booster",
      "coords": "265,690,345,784"
    },
    {
      "shape": "rect",
      "type": "PersonalMileStone",
      "coords": "136,356,225,390"
    },
    {
      "shape": "rect",
      "type": "angryB",
      "coords": "149,376,222,407"
    },
    {
      "shape": "rect",
      "type": "spectr",
      "coords": "1,415,257,502"
    },
    {
      "shape": "rect",
      "type": "ChampionsLeague",
      "coords": "25,516,105,563"
    }, {
      "shape": "rect",
      "type": "Daily",
      "coords": "257,502,338,545"

    },
    {
      "shape": "rect",
      "type": "Weekly",
      "coords": "258,552,334,594"
    },
    {
      "shape": "rect",
      "type": "Monthly",
      "coords": "259,601,335,643"
    }

  ];
  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  interactive_dashoard_response: any
  combineLatest: Subscription
  userSelectionData: any
  weeklyTitle: void;
  weeklyTopers: any;
  monthlyTopers: any;
  dailyToppers: any;
  logo: any;
  point_distribution: any;
  scorecardcolor: any
  seasonalThemeDaily: any;
  seasonalThemeWeekly: any;
  seasonalThemeMonthly: any;
  isDailyModalopen: boolean;
  isWeeklyModalOpen: boolean;
  isMonthlyModalOpen: boolean;
  notAllowed = null;
  boosterData_response: any
  StringArray: any;
  firstString: string;
  Digit: any;
  LastString: any;
  id:any
  accordioncolor: any
  
  interactive_dashoard_response_idOrganisation:any
  interactive_dashoard_points:any
  is_about_game:any
  game_audio:any
  audio:any
  audiotoggle: boolean=true;
  loginvalue:any
  previousUrl1:any
  previousUrl: any=[];
  currentUrl: string;
  promotionalPopUpData: any;
  promotionalPopupImage: any;
  produce1data: any;
  kpidata: any;
  kpiName: any;
  about_game_pdf:any
  data: any;
  seasonalThemeDaily1: any;
  seasonalThemeWeekly2: any;
  seasonalThemeMonthl3: any;
  seasonalThemeDailyBadges1: any;
  totalTargetScore: number;
  seasonalThemeWeeklyBadges2: any;
  totalTargetScoreForWeekly: number;
  seasonalThemeMonthlyBadges3: any;
  totalTargetScoreForMontly: number;
  dailyBadgesActive: boolean;
  weeklyBadgesActive: boolean;
  monthlyBadgesActive: boolean;
  constructor(config: NgbModalConfig,private readonly store: Store, public element: ElementRef, public Util: Util, private _router: Router, public http: ApiserviceService, private eventService: EventService,public location:Location ,public modalService:NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered=true;
   }

  ngOnInit(): void {
    this.game_audio=localStorage.getItem('audio_game')
    
     
 this.previousUrl1= this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
).subscribe((event: NavigationEnd) => {
   this.previousUrl = this.currentUrl;
   this.currentUrl = event.url;
   
  localStorage.setItem('previousUrl',this.previousUrl)
   
});
this.previousUrl1=localStorage.getItem('previousUrl')


    this.http.previousUrl$.subscribe((previousUrl:string)=>{
      

    })
if(this.previousUrl1=='/account/game/selection'){
  this.audiotoggle=true
  this.game_audio=localStorage.getItem('audio_game')
  
  this.audio = new Audio();
  this.audio.src = this.game_audio;
  this.audio.load();
  this.audio.play();
}
else{
  this.audiotoggle=false
  this.game_audio=localStorage.getItem('audio_game')
  
  this.audio = new Audio();
  this.audio.src = this.game_audio;
  this.audio.load();
  this.audio.pause();
}
   

//  if( this.previousUrl=='/account/game/selection'){
//   this.audio = new Audio();
//   this.audio.src = this.game_audio;
//   this.audio.load();
//   this.audio.play();
//  }
     
     

    
     
      // this.audiotoggle=false
    
    
    
    // this.playAudio();
   
    

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userObj = data?.user
      
      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      
      this.combineLatest = combineLatest([
        this.store.select(fromRoot.userLogin),
        this.store.select(fromRoot.usertheme),
        this.store.select(fromRoot.usergame),
      ]
      ).subscribe(([login, theme, game]) => {
        
        this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
        


      })

    


      if (this.mergeObj.id_coroebus_game != null) {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.mergeObj.id_coroebus_game,

        }

      
      
        
        this.http.interactiveDashboard(body).subscribe((res) => {
          
          this.interactive_dashoard_response = res;
          
          
          if(this.interactive_dashoard_response?.data.is_about_game==1){
            this.about_game_pdf= this.interactive_dashoard_response?.data.about_game[0].file_name
            
            localStorage.setItem('about_game_pdf',this.about_game_pdf)
          }
          
          this.isLoading = true;
          this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
          
          
          this.is_about_game= localStorage.setItem('is_about_game',this.interactive_dashoard_response[0].data.is_about_game)
          
         
          // this.http.BoosterData(body).subscribe((res: any) => {
          //   this.boosterData_response = res.data;

          //   

          //   this.StringArray = res.data.booster_rank_details[0].rank_position_stmt.split(" ");
          //   this.firstString = this.StringArray[0] + " " + this.StringArray[1] + " " + this.StringArray[2];
          //   this.Digit = this.StringArray[3]
          //   this.LastString = this.StringArray[4];
          //   
          //   

          // })

          this.seasonalThemeDaily = this.interactive_dashoard_response[0].data.seasonal_theme_daily;

          this.seasonalThemeWeekly = this.interactive_dashoard_response[0].data.seasonal_theme_weekly;
          this.seasonalThemeMonthly = this.interactive_dashoard_response[0].data.seasonal_theme_monthly;

          
          

          this.interactive_dashoard_points=this.interactive_dashoard_response[0].data._points[2].score
          
          
          localStorage.setItem('reward_points', this.interactive_dashoard_points);

          this.interactive_dashoard_response_idOrganisation=this.interactive_dashoard_response[0].data._personal_data.id_coroebus_organization
          
          if (this.interactive_dashoard_response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 5000)
            this.isLoading = true;
          }
          this.point_distribution = this.interactive_dashoard_response[0].data.theme_details[0].gradient_color_bg
          
          this.element.nativeElement.style.setProperty('--myvar', `${this.point_distribution}`)


          this.scorecardcolor = this.interactive_dashoard_response[0].data.theme_details[0].scoreboard_color_bg
          

          this.element.nativeElement.style.setProperty('--colorback', `${this.scorecardcolor}`)

          this.accordioncolor = this.interactive_dashoard_response[0].data.theme_details[0].light_color
          

          this.element.nativeElement.style.setProperty('--accordioncolor', `${this.accordioncolor}`)

          this.dailyToppers = this.interactive_dashoard_response[0].data.seasonal_theme_daily_badge_details;
          this.weeklyTopers = this.interactive_dashoard_response[0].data.seasonal_theme_weekly_badge_toppers;
          this.monthlyTopers = this.interactive_dashoard_response[0].data.seasonal_theme_monthly_badge_toppers;
          this.logo = this.interactive_dashoard_response[0].data.seasonal_theme_monthly[0];

          


          this.eventService.broadcast('passDataToHeader', {
            color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
            game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,
            bg_image: this.interactive_dashoard_response[0].data.theme_details

          })
          this.store.dispatch(userActions.updateUserObj({
            data: {
              color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
              game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,
              bg_image: this.interactive_dashoard_response[0].data.theme_details[0].theme_background_web

            }
          }));


          //   let body2={
          //     _userid: this.mergeObj.USERID,
          //     _game: this.mergeObj.id_coroebus_game,
          //     _section:"testing",
          //    _description:"dashboard/produce",

          //  }

          //  this.http.engagamentlog(body2).subscribe((res) => {
          //    




          //  })

        })
       
        let body1 = {
          _userid: this.mergeObj.USERID,
          _game: this.mergeObj.id_coroebus_game,
          _section_view: "1", 
          page_number: "1", 
          device_type: "W"
        }

      
        this.http.produce1(body1).subscribe((res) => {
          
          this.produce1data = res;
          
          this.kpidata=this.produce1data.data._personal_data.external_kpi_data
          
          
        })

      }
      else {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userSelectionData.id_coroebus_game,

        }

        this.http.PromotionalPopUp(body).subscribe((res)=>{
          
        })

        
        this.http.interactiveDashboard(body).subscribe((res) => {
          


          this.interactive_dashoard_response = res;

          if(this.interactive_dashoard_response.data.is_about_game==1){
            this.about_game_pdf= this.interactive_dashoard_response.data.about_game[0].file_name
            
            localStorage.setItem('about_game_pdf',this.about_game_pdf)
          }

          this.isLoading = true;
          this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
          
          
        this.is_about_game= localStorage.setItem('is_about_game',this.interactive_dashoard_response[0].data.is_about_game)
        
          this.accordioncolor = this.interactive_dashoard_response[0].data.theme_details[0].light_color
          

          this.element.nativeElement.style.setProperty('--accordioncolor', `${this.accordioncolor}`)

         
          if (this.interactive_dashoard_response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 5000)
            this.isLoading = true;
          }

    
          this.seasonalThemeDaily = this.interactive_dashoard_response[0].data.seasonal_theme_daily;

          this.seasonalThemeWeekly = this.interactive_dashoard_response[0].data.seasonal_theme_weekly;
          this.seasonalThemeMonthly = this.interactive_dashoard_response[0].data.seasonal_theme_monthly;

          this.point_distribution = this.interactive_dashoard_response[0].data.theme_details[0].gradient_color_bg
          

          this.element.nativeElement.style.setProperty('--myvar', `${this.point_distribution}`)


          this.scorecardcolor = this.interactive_dashoard_response[0].data.theme_details[0].scoreboard_color_bg
          

          this.element.nativeElement.style.setProperty('--colorback', `${this.scorecardcolor}`)

          this.eventService.broadcast('passDataToHeader', {
            color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
            game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,
            bg_image: this.interactive_dashoard_response[0].data.theme_details[0].theme_background_web

          })
          this.store.dispatch(userActions.updateUserObj({
            data: {
              color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
              game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,
              bg_image: this.interactive_dashoard_response[0].data.theme_details[0].theme_background_web

            }
          }));


        })
        

        let body1 = {
          _userid: this.mergeObj.USERID,
          _game: this.userSelectionData.id_coroebus_game,
          _section_view: "1", 
          page_number: "1", 
          device_type: "W"
        }

      
        this.http.produce1(body1).subscribe((res) => {
          
          this.produce1data = res;
          
          this.kpidata=this.produce1data.data._personal_data.external_kpi_data
          
          
        })


        
      }

    })

   



  }

ngAfterViewInit():void{

  this.GetDataFromProduceInfo()
}



  booster_data(){
    if (this.mergeObj.id_coroebus_game != null) {
      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.mergeObj.id_coroebus_game,

      }
      this.http.BoosterData(body).subscribe((res: any) => {
        this.boosterData_response = res.data;

        

        this.StringArray = res.data.booster_rank_details[0].rank_position_stmt.split(" ");
        this.firstString = this.StringArray[0] + " " + this.StringArray[1] + " " + this.StringArray[2];
        this.Digit = this.StringArray[3]
        this.LastString = this.StringArray[4];
        
        

      })
    }
    else {
      let body = {
        _userid: this.mergeObj.USERID,
        _game: this.userSelectionData.id_coroebus_game,

      }
      this.http.BoosterData(body).subscribe((res: any) => {
        this.boosterData_response = res.data;
        // 

        

        this.StringArray = res.data.booster_rank_details[0].rank_position_stmt.split(" ");
        this.firstString = this.StringArray[0] + " " + this.StringArray[1] + " " + this.StringArray[2];
        this.Digit = this.StringArray[3]
        this.LastString = this.StringArray[4];
        
        

      })
    }
  }

  playpauseaudio(){

  
  this.game_audio=localStorage.getItem('audio_game')
  
      if(this.audiotoggle){
        this.audio.pause();
        this.audiotoggle=false

      }
      else{
        
        
        this.audio.play();
        this.audiotoggle=true


      }
  }

  partClicked(arg, k: any) {

    
    
    // 
    if (arg.type == 'Lerning Academy') {
      
      this._router.navigateByUrl("/learning/learningAcademy")


    }
    else if (arg.type == 'Play Zone') {
      this._router.navigateByUrl("/playzone/play")


    }
    else if (arg.type == '3rd umpire') {
      this._router.navigateByUrl("/notification/list")


    }

    else if (arg.type == 'ChampionsLeague') {
      this._router.navigateByUrl("/champions_league")


    }




    else if (arg.type == 'spectr') {
      this._router.navigateByUrl("/spectator/spectatorView")


    }

  }

  navigateDashboard() {
    this._router.navigateByUrl("/dashboard")
  }
  navigateToChampionsLeague() {


    // window.open(
    //   'http://localhost:4200/#/home/newChallenge?_userid='+ this.mergeObj.USERID +"&_game="+  this.userSelectionData.id_coroebus_game +"&id_role="+ this.mergeObj.id_role + "&id_coroebus_user=" + this.mergeObj.id_coroebus_user,
    //   '_self' // <- This is what makes it open in a new window.

    // )
   
    
    if (this.mergeObj.id_coroebus_game != null){
      if(this.mergeObj.id_role!=8 && this.mergeObj.id_role!=9){
        const userId = this.Util.encryptData(this.mergeObj.USERID)
        const game = this.Util.encryptData(this.userSelectionData.id_coroebus_game)
        const roleid = this.Util.encryptData(this.mergeObj.id_role)
        // const id_coroebus_user = this.Util.encryptData(this.mergeObj.id_coroebus_user)
        
  
  
        window.open(
          // 'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
          // '_self'
          
            'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
          '_self'
    
        )
      }
    
    }

    else{
      if( this.mergeObj.id_role!=8 && this.mergeObj.id_role!=9){
        const userId = this.Util.encryptData(this.mergeObj.USERID)
        const game = this.Util.encryptData(this.mergeObj.id_coroebus_game)
        const roleid = this.Util.encryptData(this.mergeObj.id_role)
        // const id_coroebus_user = this.Util.encryptData(this.mergeObj.id_coroebus_user)
        
  
        window.open(
          // 'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
          // '_self' // <- This is what makes it open in a new window.
        'http://coroebus.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,

        )
      }
    
    }
   
  }


  navigateToLearningAcademy() {
    // this.audio.stop();
    
    
    const userId = this.mergeObj.USERID;
    const game = this.mergeObj.id_coroebus_game;
    const teamid=this.mergeObj.id_coroebus_team;
    const gameName=this.mergeObj.game_name;
    const teamName=this.mergeObj.team_name;
    
    if(this.kpidata.length!=0){
    this.kpiName=this.kpidata[0].kpi_name;
    
    const isAttemted=this.kpidata[0].is_attempted;
    const isCorrect=this.kpidata[0].is_correct;

    
    // 
    
//  
//  "&_team_name="+teamName+"&_game_name="+gameName+
//   "&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self','_self'
// );
   
    window.open(
          'https://coroebus.in/Learning_academy/#/LearningAcademy/badges?_game='+game+"&_userid="+userId+"&_team="+teamid+"&_game_name="+gameName+
    "&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self'

      
    )
    
   }
   else{

    this.kpiName='Game OF Phone';
    const isAttemted='8'
    const isCorrect='8'
    window.open(
      'https://coroebus.in/Learning_academy/#/LearningAcademy/badges?_game='+game+"&_userid="+userId+"&_team="+teamid+"&_game_name="+gameName+
"&_team_name="+teamName+"&_kpi_name="+this.kpiName+"&_isAttemted="+isAttemted+"&_isCorrect="+isCorrect,'_self'

  
)

   
   }
   
  }

  navigateToNotification() {
    this._router.navigateByUrl("/notification/list")
  }

  navigateToSpectatorView() {
    this._router.navigateByUrl("/spectator/spectatorView")
    
  }

  navigateToPlayZone() {
    this._router.navigateByUrl("/playzone/play")
  }

  navigateAchievementshelf() {
    this._router.navigateByUrl("/Achievement/AchievementShelf")

  }

  navigateReward() {
    localStorage.setItem('rewardid',this.mergeObj.USERID)

    this._router.navigateByUrl("/reward/rewardPoints")

  }
  navigateToProfile() {
    this._router.navigateByUrl("/profile")

  }

  navigateTopersonalMilestone() {
    this._router.navigateByUrl("/personal_milestone")
  }

  navigateMyPerformance(){
    this._router.navigateByUrl("performance/page")

  }    
  
  GetDataFromProduceInfo(){
    let obj = {
      _userid: this.mergeObj.USERID,
      _game: this.userSelectionData.id_coroebus_game,
    }
    
    this.http.produceInfo(obj).subscribe((res)=>{
      

      this.data=res;
   
    
      this.seasonalThemeDaily1=this.data.data.seasonal_theme_daily
      this.seasonalThemeWeekly2=this.data.data.seasonal_theme_weekly;
      this.seasonalThemeMonthl3=this.data.data.seasonal_theme_monthly
      
        
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
  open(content:any) {
    if(this.mergeObj.id_coroebus_game != null){
      var body = {
        _userid: this.mergeObj.USERID,
        _game: this.mergeObj.id_coroebus_game,
        _record_count:0
    }
    }
    else{
      var body = {
        _userid: this.mergeObj.USERID,
        _game: this.userSelectionData.id_coroebus_game,
        _record_count:0
    }
    }
  

    this.http.PromotionalPopUp(body).subscribe((res)=>{
      this.promotionalPopUpData=res;
      
      this.promotionalPopupImage=this.promotionalPopUpData.data[0].list[0].image;
      
      let body={
        _popupid:this.promotionalPopUpData.data[0].list[0].id
      }
      this.http.updatePopUp(body).subscribe((res)=>{
        
        
      })
    })
    setTimeout(()=>{
      if(this.promotionalPopUpData.data[0].list!=''){
        
        this.modalService.open(content);

      }
    },5000)
    
  }
  promotionalredirection(value:any){
    

    if(value=="Spectator"){
     
      this._router.navigateByUrl('/spectator/spectatorView');
      this.modalService.dismissAll();

    }
    else if(value=="Profile"){
     
      this._router.navigateByUrl('/profile');
      this.modalService.dismissAll();

      // this.modalController.dismiss();
    }
    else if(value=="Myperformance"){
     
      this._router.navigateByUrl('/performance/page');
      this.modalService.dismissAll();

      // this.modalController.dismiss();
    }
    else if(value=="Playzone"){
     
      this._router.navigateByUrl('playzone/play');
      this.modalService.dismissAll();

     
    }
    else if(value=="Seasonal"){
    
      this._router.navigateByUrl('Achievement/AchievementShelf');
      this.modalService.dismissAll();

      
    }
    else if(value=="Rewards"){
    
      this._router.navigateByUrl('/reward/rewardPoints');
      this.modalService.dismissAll();

    
    }
    else if(value=="Learning"){
    
      this._router.navigateByUrl('/learning/learningAcademy');
      this.modalService.dismissAll();

    
    }
    else if(value=="Champions"){
    
         
     this._router.navigateByUrl('/champions_league')
    
    
      this.modalService.dismissAll();

    
    }

    else if(value=="Milestone"){
    
      this._router.navigateByUrl('/personal_milestone');
      this.modalService.dismissAll();

    
    }
    // else if(value=="Learning"){
    //   this.navCtrl.navigateForward(['/learning-academy-tabs']);
    //   this.modalController.dismiss();
    // }
    // else if(value=="Champions"){
    //   this.navCtrl.navigateForward(['/spectator-view']);
    //   this.modalController.dismiss();
    // }
    // else if(value=="Milestone"){
    //   this.navCtrl.navigateForward(['/spectator-view']);
    //   this.modalController.dismiss();
    // }
    else{
     


    }
  }

  ngOnDestroy(): void {
   this.audio.pause()
  //  localStorage.removeItem('audio_game');
  

  }

}