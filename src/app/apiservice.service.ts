import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  URLstring = environment.apiURL

  constructor(public Http:HttpClient) { }
  
  rewards(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/coroebus-beta-api-levels/Passbook/getReward`
    return this.Http.post(tempurl,data)

  }

  seasonal_theme(data:any){
    // var tempurl = ${this.URLstring}+/coroebus-beta-api-levels/Passbook/getReward
    var tempurl = `${this.URLstring}`+`/coroebus-beta-api-levels/SeasonalTheme/Dashboard`
    return this.Http.post(tempurl,data)

  }

  popup_passbook_redemption(data:any){
    var tempurl = `${this.URLstring}`+`/coroebus-beta-api-levels/Passbook/getRewardDetail`
    return this.Http.post(tempurl,data)
  }

  redeemed(data:any){
    var tempurl = `${this.URLstring}`+`/coroebus-beta-api-levels/redeemed_reward/redeemed`
    return this.Http.post(tempurl,data)
  }

  popup_bagde_details(data:any){
    var tempurl = `${this.URLstring}`+`/coroebus-beta-api-levels/SeasonalTheme/BadgeDetail`
    return this.Http.post(tempurl,data)
  }

}
