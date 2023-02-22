import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  URLstring = environment.apiURL
    Path='coroebus-beta-api-levels';
  open: any;
    
    // Path='coroebus-tgc-api-levels'
  constructor(public Http:HttpClient) { }


  private previousUrl:BehaviorSubject<string>=new BehaviorSubject<string>(null);
  public previousUrl$:Observable<string>=this.previousUrl.asObservable();


  setPreviousUrl(previousUrl:string){
    this.previousUrl.next(previousUrl);
  }

  
  rewards(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/Passbook/getReward`
    return this.Http.post(tempurl,data)

  }

  produceDashboard(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/dashboard/produce`
    return this.Http.post(tempurl,data)

  }

  seasonal_theme(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/SeasonalTheme/Dashboard`
    return this.Http.post(tempurl,data)

  }

  popup_passbook_redemption(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/Passbook/getRewardDetail`
    return this.Http.post(tempurl,data)
  }

  redeemed(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/redeemed_reward/redeemed`
    return this.Http.post(tempurl,data)
  }

  popup_bagde_details(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/SeasonalTheme/BadgeDetail`
    return this.Http.post(tempurl,data)
  }

  seasonal_rewards_points(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/SeasonalTheme/Overallrewards`
    return this.Http.post(tempurl,data)
  }
  playZone(data:any)
  {
    var tempurl = `${this.URLstring}`+`/${this.Path}/SpotDashboard/produce`
    return this.Http.post(tempurl,data)
  }

  playZoneUpdate(data:any)
  {
    var tempurl = `${this.URLstring}`+`/${this.Path}/SpotDashboard/produce`
    return this.Http.put(tempurl,data)
  }

  playZonePassbook(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/SpotDashboard/passbook`
    return this.Http.post(tempurl,data)


  }

  interactiveDashboard(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/DashboardHome/produce`
    return this.Http.post(tempurl,data)
  }

  spectator_dashboard(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/UserRankingAndBadgeList/gameRanking`
    return this.Http.post(tempurl,data)
  }
  
  BoosterData(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/DashboardHome/produce_booster`
    return this.Http.post(tempurl,data)

  }

  gameRanking_Groups(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/UserRankingAndBadgeList/gameRanking_Groups`
    return this.Http.post(tempurl,data)

  }

  spectatorSearch(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/UserRankingAndBadgeList/spect_search`
    return this.Http.post(tempurl,data)

  }

  

  engagamentlog(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/dashboard/engagement_log`
    return this.Http.post(tempurl,data)
  }

  PromotionalPopUp(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/Popup/popup_list`
    return this.Http.post(tempurl,data)

  }

  updatePopUp(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/Popup/popup_update`
    return this.Http.post(tempurl,data)

  }

  spectnotification(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/Notification/notification_list`
    return this.Http.post(tempurl,data)

  }

}
