import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'app/apiservice.service';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
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

  constructor(public http:ApiserviceService , public router:ActivatedRoute) { }

  ngOnInit(): void {
    var href = window.location.href;
    var url = new URL(href);
    this.url = window.location.href;
    var checkUserID = this.router.queryParams
      .subscribe(params => {
        this.campaign_type = params['campaign_type'];
        
      });
    this.GetDataFromProduceInfo();
    if(this.url.includes('campaign_type=daily')){
      this.isDailyModalopen=true;
      this.isWeeklyModalOpen=false;
      this.isMonthlyModalOpen=false;
    }
    else if(this.url.includes('campaign_type=weekly')){
      this.isDailyModalopen=false;
      this.isWeeklyModalOpen=true;
      this.isMonthlyModalOpen=false;
    }
    else  if(this.url.includes('campaign_type=monthly')){
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
      // const obj = {_userid: "GOP_IN505", _game: "183"}
      const obj={_userid: "TGC127", _game: "162"}
      const res = await this.http.produceInfo(obj).toPromise();
      this.data = res;
  
      
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
