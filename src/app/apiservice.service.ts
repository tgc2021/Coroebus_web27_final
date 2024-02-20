import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  get(arg0: string) {
    throw new Error("Method not implemented.");
  }

  URLstring = environment.apiURL;
  open: any;
  // Path='coroebus-beta-api-levels';
    Path='coroebus-tgc-api-levels';
  // URL For Navigation
    //mainUrl='http://coroebusbeta.in';
    // mainUrl='https://coroebus.in';
     mainUrl='http://localhost:4201'

  isinM2OSTPlatform=false;
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



  bulletins(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/Dashboard/add_ins`
    return this.Http.post(tempurl,data)

  }

  produce12(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/dashboard/produce_12`
    return this.Http.post(tempurl,data)

  }

  produce_tl(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/dashboard/produce_1`
    return this.Http.post(tempurl,data)

  }

  buisnessHead(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/Dashboard/produce_bh`
    return this.Http.post(tempurl,data)

  }

  governance_index(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/${this.Path}/Dashboard/governance_index_report`
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

  produce1(data:any){
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

  campaignsPopup(data:any){
    var tempurl= `${this.URLstring}`+ `/${this.Path}/DashboardHome/seasonal_theme`
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

  challangeRecived(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/DashboardChampionsLeague/new_challenge_list`
    return this.Http.post(tempurl,data)

  }
  produceInfo(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/Dashboard/produce_info`
    return this.Http.post(tempurl,data)

  }
   updatePoke(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/Poke/update_poke`
    return this.Http.post(tempurl,data)

   }

   pointDistributionPopup(data:any){
    var tempurl = `${this.URLstring}`+`/${this.Path}/Dashboard/point_dist`
    return this.Http.post(tempurl,data)

   }


   newInteractiveDashboard(data:any){
    var tempurl= `${this.URLstring}`+`/${this.Path}/Dashboard/interactiveDashboard`;
    return this.Http.post(tempurl,data)

   }
}
