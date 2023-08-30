import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../core/app-state';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subscription, combineLatest, Subject, Observable, interval } from 'rxjs';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  data: any;
  seasonalThemeDaily1: any;
  seasonalThemeWeekly2: any;
  seasonalThemeMonthl3: any;
  seasonalThemeDailyBadges1: any;
  lastArrayseasonalThemeDailyBadges2: any;
  seasonalThemeWeeklyBadges2: any;
  lastArrayseasonalThemeWeeklyBadges2: any;
  seasonalThemeMonthlyBadges3: any;
  lastArrayseasonalThemeMonthlyBadges2: any;
  dailyBadgesActive: boolean;
  weeklyBadgesActive: boolean;
  monthlyBadgesActive: boolean;
  onGoingChallenges: any;
  challengeReacieved: any;
  isDailyModalopen:boolean=false;
  isWeeklyModalOpen:boolean=true;
  isMonthlyModalOpen:boolean=false;
  campaign_type: any;
  isMarginTop: boolean;
  url: string;
  seasonalCampaign: string;
  userObj: any
  mergeObj: any
  combineLatest: Subscription
  userSelectionData: any

  constructor(public http:ApiserviceService , public router:ActivatedRoute,private readonly store: Store) { }

  ngOnInit(): void {
    var href = window.location.href;
    var url = new URL(href);
    this.url = window.location.href;
    var checkUserID = this.router.queryParams
      .subscribe(params => {
       
        this.seasonalCampaign= localStorage.getItem('tab')?.toLowerCase( );
      
        
      });

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
          // console.log(this.userSelectionData);
        })
      })

      console.log(this.userSelectionData);
      console.log(this.mergeObj);

      

    this.GetDataFromProduceInfo();
    if(this.seasonalCampaign=='daily'){
      this.isDailyModalopen=true;
      this.isWeeklyModalOpen=false;
      this.isMonthlyModalOpen=false;
    }
    else if(this.seasonalCampaign=='weekly'){
      this.isDailyModalopen=false;
      this.isWeeklyModalOpen=true;
      this.isMonthlyModalOpen=false;
    }
    else  if(this.seasonalCampaign=='monthly'){
      
      this.isDailyModalopen=false;
      this.isWeeklyModalOpen=false;
      this.isMonthlyModalOpen=true;

    }
    else{
      this.isDailyModalopen=true;
      this.isWeeklyModalOpen=false;
      this.isMonthlyModalOpen=false;

    }
  }
  async GetDataFromProduceInfo() {
   
    try {

      if (this.mergeObj.id_coroebus_game != null) {
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.mergeObj.id_coroebus_game,
  
        }
        
      const res = await this.http.produceInfo(body).toPromise();
      this.data = res;
      }
      else{
        let body = {
          _userid: this.mergeObj.USERID,
          _game: this.userSelectionData.id_coroebus_game,

        }
        const res = await this.http.produceInfo(body).toPromise();
        this.data = res;
      }
      // const obj = {_userid: "GOP_IN505", _game: "183"}
      
      
  
      
      this.seasonalThemeDaily1 = this.data.data.seasonal_theme_daily;
      this.seasonalThemeWeekly2 = this.data.data.seasonal_theme_weekly;
      this.seasonalThemeMonthl3 = this.data.data.seasonal_theme_monthly;
  
      this.seasonalThemeDailyBadges1 = this.data.data.seasonal_theme_daily_badge_details;
      this.lastArrayseasonalThemeDailyBadges2 = this.seasonalThemeDailyBadges1[
        this.seasonalThemeDailyBadges1.length - 1
      ];
  
      this.seasonalThemeWeeklyBadges2 = this.data.data.seasonal_theme_weekly_badge_details;
      this.lastArrayseasonalThemeWeeklyBadges2 = this.seasonalThemeWeeklyBadges2[
        this.seasonalThemeWeeklyBadges2.length - 1
      ];
  
      this.seasonalThemeMonthlyBadges3 = this.data?.data?.seasonal_theme_monthly_badge_details;
      this.lastArrayseasonalThemeMonthlyBadges2 = this.seasonalThemeMonthlyBadges3[
        this.seasonalThemeMonthlyBadges3.length - 1
      ];
  
      this.seasonalThemeDailyBadges1.forEach((res) => {
        if (res.active_class === "1") {
          this.dailyBadgesActive = true;
        }
      });
  
      this.seasonalThemeWeeklyBadges2.forEach((res) => {
        if (res.active_class === "1") {
          this.weeklyBadgesActive = true;
        }
      });
  
      this.seasonalThemeMonthlyBadges3.forEach((res) => {
        if (res.active_class === "1") {
          this.monthlyBadgesActive = true;
        }
      });
  
      this.onGoingChallenges = this.data.data.challenge_list;
      this.challengeReacieved = this.data.data.new_challenge_list;
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle error here
    }
  }
}
