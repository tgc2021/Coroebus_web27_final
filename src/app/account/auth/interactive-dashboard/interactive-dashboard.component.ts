import { Component, ElementRef, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import * as fromRoot from '../../../core/app-state';
import { Store } from '@ngrx/store';
import { filter, take, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'app/apiservice.service';
import { Util } from '@app/utils/util';
import { Subscription, combineLatest, Subject, Observable, interval } from 'rxjs';
import * as userActions from '../../../core/app-state/actions';



@Component({
  selector: 'app-interactive-dashboard',
  templateUrl: './interactive-dashboard.component.html',
  styleUrls: ['./interactive-dashboard.component.scss']
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
  constructor(private readonly store: Store, public element: ElementRef, public Util: Util, private _router: Router, public http: ApiserviceService, private eventService: EventService,public location:Location) {
   
   }

  ngOnInit(): void {
    this.game_audio=localStorage.getItem('audio_game')
    console.log(this.game_audio);
     
 this.previousUrl1= this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
).subscribe((event: NavigationEnd) => {
   this.previousUrl = this.currentUrl;
   this.currentUrl = event.url;
   console.log(this.previousUrl);
  localStorage.setItem('previousUrl',this.previousUrl)
   
});
this.previousUrl1=localStorage.getItem('previousUrl')
console.log(this.previousUrl1);

    this.http.previousUrl$.subscribe((previousUrl:string)=>{
      console.log(previousUrl);

    })
if(this.previousUrl1=='/account/game/selection'){
  this.audiotoggle=true
  this.game_audio=localStorage.getItem('audio_game')
  console.log(this.game_audio);
  this.audio = new Audio();
  this.audio.src = this.game_audio;
  this.audio.load();
  this.audio.play();
}
else{
  this.audiotoggle=false
  this.game_audio=localStorage.getItem('audio_game')
  console.log(this.game_audio);
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
      console.log(this.userObj);

      this.mergeObj = { ...this.userObj?._personal_data, ...this.userObj?.otherInfo }
      console.log(this.mergeObj);

      this.combineLatest = combineLatest([
        this.store.select(fromRoot.userLogin),
        this.store.select(fromRoot.usertheme),
        this.store.select(fromRoot.usergame),
      ]
      ).subscribe(([login, theme, game]) => {
        console.log(login, theme, game)
        this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
        console.log(this.userSelectionData);


      })

    


      if (this.mergeObj.id_coroebus_game != null) {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.mergeObj.id_coroebus_game,

        }

      
        console.log(body);
        this.http.interactiveDashboard(body).subscribe((res) => {
          console.log(res)
          this.interactive_dashoard_response = res;

          
          
          this.isLoading = true;
          this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
          console.log(this.interactive_dashoard_response);
          
          this.is_about_game= localStorage.setItem('is_about_game',this.interactive_dashoard_response[0].data.is_about_game)
          console.log(this.is_about_game);
         
          this.http.BoosterData(body).subscribe((res: any) => {
            this.boosterData_response = res.data;

            console.log(res);

            this.StringArray = res.data.booster_rank_details[0].rank_position_stmt.split(" ");
            this.firstString = this.StringArray[0] + " " + this.StringArray[1] + " " + this.StringArray[2];
            this.Digit = this.StringArray[3]
            this.LastString = this.StringArray[4];
            console.log(this.StringArray);
            console.log(this.LastString);

          })

          this.seasonalThemeDaily = this.interactive_dashoard_response[0].data.seasonal_theme_daily;

          this.seasonalThemeWeekly = this.interactive_dashoard_response[0].data.seasonal_theme_weekly;
          this.seasonalThemeMonthly = this.interactive_dashoard_response[0].data.seasonal_theme_monthly;

          console.log(this.seasonalThemeWeekly)
          console.log(this.interactive_dashoard_response);

          this.interactive_dashoard_points=this.interactive_dashoard_response[0].data._points[2].score
          console.log(this.interactive_dashoard_points);
          
          localStorage.setItem('reward_points', this.interactive_dashoard_points);

          this.interactive_dashoard_response_idOrganisation=this.interactive_dashoard_response[0].data._personal_data.id_coroebus_organization
console.log(this.interactive_dashoard_response_idOrganisation);

          if (this.interactive_dashoard_response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 5000)
            this.isLoading = true;
          }





          this.point_distribution = this.interactive_dashoard_response[0].data.theme_details[0].gradient_color_bg
          console.log(this.point_distribution);

          this.element.nativeElement.style.setProperty('--myvar', `${this.point_distribution}`)


          this.scorecardcolor = this.interactive_dashoard_response[0].data.theme_details[0].scoreboard_color_bg
          console.log(this.scorecardcolor);

          this.element.nativeElement.style.setProperty('--colorback', `${this.scorecardcolor}`)

          this.accordioncolor = this.interactive_dashoard_response[0].data.theme_details[0].light_color
          console.log(this.accordioncolor);

          this.element.nativeElement.style.setProperty('--accordioncolor', `${this.accordioncolor}`)

          this.dailyToppers = this.interactive_dashoard_response[0].data.seasonal_theme_daily_badge_details;
          this.weeklyTopers = this.interactive_dashoard_response[0].data.seasonal_theme_weekly_badge_toppers;
          this.monthlyTopers = this.interactive_dashoard_response[0].data.seasonal_theme_monthly_badge_toppers;
          this.logo = this.interactive_dashoard_response[0].data.seasonal_theme_monthly[0];

          console.log("=------->>", this.dailyToppers);


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
          //    console.log(res)




          //  })

        })
       
      }
      else {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userSelectionData.id_coroebus_game,

        }

        

        console.log(body);
        this.http.interactiveDashboard(body).subscribe((res) => {
          console.log(res)


          this.interactive_dashoard_response = res;

          

          this.isLoading = true;
          this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
          console.log(this.interactive_dashoard_response);
          
        this.is_about_game= localStorage.setItem('is_about_game',this.interactive_dashoard_response[0].data.is_about_game)
        console.log(this.is_about_game);
          this.accordioncolor = this.interactive_dashoard_response[0].data.theme_details[0].light_color
          console.log(this.accordioncolor);

          this.element.nativeElement.style.setProperty('--accordioncolor', `${this.accordioncolor}`)

         
          if (this.interactive_dashoard_response) {
            setTimeout(() => {
              this.isLoading = false;
            }, 5000)
            this.isLoading = true;
          }

          this.http.BoosterData(body).subscribe((res: any) => {
            this.boosterData_response = res.data;

            console.log(res);

            this.StringArray = res.data.booster_rank_details[0].rank_position_stmt.split(" ");
            this.firstString = this.StringArray[0] + " " + this.StringArray[1] + " " + this.StringArray[2];
            this.Digit = this.StringArray[3]
            this.LastString = this.StringArray[4];
            console.log(this.StringArray);
            console.log(this.LastString);

          })
          this.seasonalThemeDaily = this.interactive_dashoard_response[0].data.seasonal_theme_daily;

          this.seasonalThemeWeekly = this.interactive_dashoard_response[0].data.seasonal_theme_weekly;
          this.seasonalThemeMonthly = this.interactive_dashoard_response[0].data.seasonal_theme_monthly;

          this.point_distribution = this.interactive_dashoard_response[0].data.theme_details[0].gradient_color_bg
          console.log(this.point_distribution);

          this.element.nativeElement.style.setProperty('--myvar', `${this.point_distribution}`)


          this.scorecardcolor = this.interactive_dashoard_response[0].data.theme_details[0].scoreboard_color_bg
          console.log(this.scorecardcolor);

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



        //   let body1={
        //     _userid:this.mergeObj.USERID,
        //     _section:"testing",
        //    _description:"dashboard/produce",
        //    _game:this.userSelectionData.id_coroebus_game
        //  }
        //  console.log(body1);


        //  this.http.engagamentlog(body1).subscribe((res) => {
        //    console.log(res)




        //  })
      }

    })





  }

  playpauseaudio(){

  console.log('pause');
  this.game_audio=localStorage.getItem('audio_game')
  console.log(this.game_audio);
      if(this.audiotoggle){
        this.audio.pause();
        this.audiotoggle=false

      }
      else{
        console.log('play');
        
        this.audio.play();
        this.audiotoggle=true


      }
  }

  partClicked(arg, k: any) {

    console.log(k);
    console.log("---->", arg);
    // console.log(arg);
    if (arg.type == 'Lerning Academy') {
      console.log("Learning Academy");
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
        console.log(this.Util.decryptData(userId),this.Util.decryptData(game),this.Util.decryptData(roleid),this.Util.decryptData(this.mergeObj.id_coroebus_user));
  
  
        window.open(
          'http://coroebusbeta.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
          '_self' // <- This is what makes it open in a new window.
    
        )
      }
    
    }

    else{
      if( this.mergeObj.id_role!=8 && this.mergeObj.id_role!=9){
        const userId = this.Util.encryptData(this.mergeObj.USERID)
        const game = this.Util.encryptData(this.mergeObj.id_coroebus_game)
        const roleid = this.Util.encryptData(this.mergeObj.id_role)
        // const id_coroebus_user = this.Util.encryptData(this.mergeObj.id_coroebus_user)
        console.log(this.Util.decryptData(userId),this.Util.decryptData(game));
  
        window.open(
          'http://coroebusbeta.in/champions_league/#/home/newChallenge?_userid='+userId+"&_game="+game+"&id_role="+roleid+"&id_coroebus_user="+this.mergeObj.id_coroebus_user,
          '_self' // <- This is what makes it open in a new window.
    
        )
      }
    
    }
   
  }

  navigateToLearningAcademy() {
    // this.audio.stop();

    this._router.navigateByUrl("/learning/learningAcademy")
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

  ngOnDestroy(): void {
   this.audio.pause()
  //  localStorage.removeItem('audio_game');
  

  }

}
