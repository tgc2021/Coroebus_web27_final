import { Component, ElementRef, OnInit } from '@angular/core';


import * as fromRoot from '../../../core/app-state';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '@app/services/event.service';
import { ToastService } from '@app/services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from 'app/apiservice.service';
import { Util } from '@app/utils/util';
import { Subscription, combineLatest, Subject, Observable } from 'rxjs';
import * as userActions from '../../../core/app-state/actions';

@Component({
  selector: 'app-interactive-dashboard',
  templateUrl: './interactive-dashboard.component.html',
  styleUrls: ['./interactive-dashboard.component.scss']
})
export class InteractiveDashboardComponent implements OnInit {
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
    },{
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

  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  interactive_dashoard_response:any
  combineLatest: Subscription
  userSelectionData:any
  weeklyTitle: void;
  weeklyTopers: any;
  monthlyTopers: any;
  dailyToppers: any;
  logo: any;
  point_distribution:any;
  scorecardcolor:any
  constructor(private readonly store: Store, public element: ElementRef, public Util: Util,private _router: Router, public http: ApiserviceService, private eventService: EventService) { }
  
  ngOnInit(): void {
   
  
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
      
if(this.mergeObj.id_coroebus_game != null){
  let body = {
    _userid: this.mergeObj.USERID,
    _game: this.mergeObj.id_coroebus_game,
   
  }

  console.log(body);
  this.http.interactiveDashboard(body).subscribe((res) => {
    console.log(res)
    this.interactive_dashoard_response = res;
    this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
    console.log(this.interactive_dashoard_response);

    this.point_distribution = this.interactive_dashoard_response[0].data.theme_details[0].gradient_color_bg
    console.log(this.point_distribution);
    
    this.element.nativeElement.style.setProperty('--myvar', `${this.point_distribution}`)


    this.scorecardcolor = this.interactive_dashoard_response[0].data.theme_details[0].scoreboard_color_bg
    console.log(this.scorecardcolor);
    
    this.element.nativeElement.style.setProperty('--colorback', `${this.scorecardcolor}`)


    this.dailyToppers=this.interactive_dashoard_response[0].data.seasonal_theme_daily_badge_details;
    this.weeklyTopers=this.interactive_dashoard_response[0].data.seasonal_theme_weekly_badge_toppers;
    this.monthlyTopers=this.interactive_dashoard_response[0].data.seasonal_theme_monthly_badge_toppers;
    this.logo=this.interactive_dashoard_response[0].data.seasonal_theme_monthly[0];

    console.log("=------->>",this.dailyToppers);

    
    this.eventService.broadcast('passDataToHeader', {
      color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
      game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,

    })
    this.store.dispatch(userActions.updateUserObj({
      data: {
        color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
        game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,

      }
    }));
    
   
  })
}
else{
  let body = {
    _userid: this.mergeObj.USERID,
    _game: this.userSelectionData.id_coroebus_game,
   
  }

  console.log(body);
  this.http.interactiveDashboard(body).subscribe((res) => {
    console.log(res)
    this.interactive_dashoard_response = res;
    this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
    console.log(this.interactive_dashoard_response);

    
    this.eventService.broadcast('passDataToHeader', {
      color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
      game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,

    })
    this.store.dispatch(userActions.updateUserObj({
      data: {
        color: this.interactive_dashoard_response[0].data.theme_details[0].dark_color,
        game_logo: this.interactive_dashoard_response[0].data._personal_data.game_logo,

      }
    }));
    
   
  })
}
      
    })
  

  }


  partClicked(arg,k:any) {

    console.log(k);
    console.log("---->", arg);
    // console.log(arg);
    if (arg.type == 'Lerning Academy') {
      console.log("Learning Academy");
      this._router.navigateByUrl("/learning/learningAcademy")

      
    }
    else if(arg.type == 'Play Zone'){
      this._router.navigateByUrl("/playzone/play")

      
    }
    else if(arg.type == '3rd umpire'){
      this._router.navigateByUrl("/notification/list")

      
    }

    else if(arg.type == 'ChampionsLeague'){
      this._router.navigateByUrl("/champions_league")

      
    }

  


    else if(arg.type == 'spectr'){
      this._router.navigateByUrl("/spectator/spectatorView")

      
    }
    
  }

  navigateDashboard(){
    this._router.navigateByUrl("/dashboard")
  }
  navigateToChampionsLeague(){
    this._router.navigateByUrl("/champions_league")

  }

  navigateToLearningAcademy(){
    this._router.navigateByUrl("/learning/learningAcademy")
  }
  navigateToNotification(){
    this._router.navigateByUrl("/notification/list")
  }

  navigateToSpectatorView(){
    this._router.navigateByUrl("/spectator/spectatorView")
  }

  navigateToPlayZone(){
    this._router.navigateByUrl("/playzone/play")
  }

  navigateAchievementshelf(){
    this._router.navigateByUrl("/Achievement/AchievementShelf")

  }

  navigateReward(){
    this._router.navigateByUrl("/reward/rewardPoints")

  }
  navigateToProfile(){
    this._router.navigateByUrl("/profile")

  }

  navigateTopersonalMilestone(){
    this._router.navigateByUrl("/personal_milestone")
  }
  
}
