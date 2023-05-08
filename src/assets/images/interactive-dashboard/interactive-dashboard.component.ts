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
    {
      "shape": "rect",
      "type": "Lerning Academy",
      "coords": "23,384,109,348"
    }, {

      "shape": "rect",
      "type": "Play Zone",
      "coords": "248,385,337,348",
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
      "coords": "24,692,101,782"
    }, {
      "shape": "rect",
      "type": "Booster",
      "coords": "295,699,333,783"
    },
    {
      "shape": "rect",
      "type": "PersonalMileStone",
      "coords": "137,391,226,354"
    },
    {
      "shape": "rect",
      "type": "angryB",
      "coords": "149,376,222,407"
    },
    {
      "shape": "rect",
      "type": "spectr",
      "coords": "7,419,249,495"
    },
    {
      "shape": "rect",
      "type": "ChampionsLeague",
      "coords": "23,517,105,562"
    },{
      "shape": "rect",
      "type": "Daily",
      "coords": "256,502,338,544"
     
    },
    {
      "shape": "rect",
      "type": "Weekly",
      "coords": "257,551,337,592"
    },
    {
      "shape": "rect",
      "type": "Monthly",
      "coords": "259,599,339,640"
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

  constructor(private readonly store: Store, public Util: Util,private _router: Router, public http: ApiserviceService, private eventService: EventService) { }

  ngOnInit(): void {
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
      
if(this.mergeObj.id_coroebus_game != null){
  let body = {
    _userid: this.mergeObj.USERID,
    _game: this.mergeObj.id_coroebus_game,
   
  }

  
  this.http.interactiveDashboard(body).subscribe((res) => {
    
    this.interactive_dashoard_response = res;
    this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
    this.dailyToppers=this.interactive_dashoard_response[0].data.seasonal_theme_daily_badge_details;
    this.weeklyTopers=this.interactive_dashoard_response[0].data.seasonal_theme_weekly_badge_toppers;
    this.monthlyTopers=this.interactive_dashoard_response[0].data.seasonal_theme_monthly_badge_toppers;
    
    
    

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

  
  this.http.interactiveDashboard(body).subscribe((res) => {
    
    this.interactive_dashoard_response = res;
    this.interactive_dashoard_response = Array.of(this.interactive_dashoard_response);
    
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

    
    
    // 
    if (arg.type == 'Lerning Academy') {
      
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

  


    // else if(arg.type == 'PersonalMileStone'){
    //   document.getElementById("btn").click();

      
    // }
    
    
    

  }

  navigateDashboard(){
    this._router.navigateByUrl("/dashboard")
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
}