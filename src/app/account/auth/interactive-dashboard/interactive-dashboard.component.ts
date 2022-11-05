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
      "coords": "267,693,343,780"
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
    }

  ];

  destroy$: Subject<boolean> = new Subject<boolean>();
  userObj: any
  mergeObj: any
  interactive_dashoard_response:any
  combineLatest: Subscription
  userSelectionData:any

  constructor(private readonly store: Store, public Util: Util,private _router: Router, public http: ApiserviceService, private eventService: EventService) { }

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
