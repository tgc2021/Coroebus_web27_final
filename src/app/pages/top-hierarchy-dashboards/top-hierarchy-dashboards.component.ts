import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../core/app-state';
import { ActivatedRoute } from '@angular/router';
import { Util } from '@app/utils/util';
import { HttpProtocols } from '@app/http/http.protocols';
import { DashboardModel } from '@models/dashboard.model';
import { ApiserviceService } from 'app/apiservice.service';
import { EventService } from '@app/services/event.service';
import * as userActions from '../../core/app-state/actions';

@Component({
  selector: 'app-top-hierarchy-dashboards',
  templateUrl: './top-hierarchy-dashboards.component.html',
  styleUrls: ['./top-hierarchy-dashboards.component.scss']
})
export class TopHierarchyDashboardsComponent implements OnInit {
  counter: any = 0
  isactive: boolean = true
  combineLatest: Subscription
  userSelectionData: any
  _routeSub: Subscription
  location: any
  queryParams: any
  sectionView_1:any
  pokeAnimationData:any
  getBackImagesFromSectionView1: any
  getBackImages: any = [];
  rewardPoints:any
  gamePoints:any
  web_profile_back_image: any;
  sectionView_1_err:any
  constructor(private readonly store: Store, private _route: ActivatedRoute, public Util: Util,public http:ApiserviceService,private eventService: EventService) { }

  ngOnInit(): void {
    this.isactive = true


    this.combineLatest = combineLatest([
      this.store.select(fromRoot.userLogin),
      this.store.select(fromRoot.usertheme),
      this.store.select(fromRoot.usergame),
    ]
    ).subscribe(([login, theme, game]) => {
      console.log(login, theme, game)
      this.userSelectionData = { ...login?.user, ...theme?.theme, ...game?.game }
      console.log(this.userSelectionData);

      this._routeSub?.unsubscribe()
      this._routeSub = this._route.queryParams.subscribe(queryParams => {
        // do something with the query params
        console.log(queryParams?.userID);


        if (queryParams?.userID) {
          console.log(window.location.href);
          this.location = window.location.href
          if (this.location.includes("?")) {
            var replacedUserId = queryParams?.userID.replace(/ /g, '+');
            console.log(replacedUserId);

            var replacedGameId = queryParams?.gameID.replace(/ /g, '+');
            console.log(replacedGameId);

            var replacedRoleId = queryParams?.roleID.replace(/ /g, '+');
            console.log(replacedRoleId);
            queryParams = { userID: this.Util.decryptData(replacedUserId), gameID: this.Util.decryptData(replacedGameId), roleID: this.Util.decryptData(replacedRoleId) }

          }
          else {
            queryParams = { userID: this.Util.decryptData(queryParams?.userID), gameID: this.Util.decryptData(queryParams?.gameID), roleID: this.Util.decryptData(queryParams?.roleID) }

          }
          this.queryParams = queryParams
          console.log(this.queryParams);



          this.getUserBannerDataSectionView_1(queryParams)
          // this.getUserBannerDataSectionView_2(queryParams)
          // this.getUserBannerDataSectionView_3(null, queryParams)
         
          // this.notificationList()
          // this.addIns()
        } else {
          this.getUserBannerDataSectionView_1()
          // this.getUserBannerDataSectionView_2()
          // this.getUserBannerDataSectionView_3()
          // this.notificationList()
          // this.addIns()

        }
      });


    })
  }


  async getUserBannerDataSectionView_1(queryParams?: any) {
    let err: any, res: any;
    let body: any;
    body = {
      "_userid": queryParams?.userID ? queryParams?.userID : this.userSelectionData?._personal_data?.USERID,
      "_game": queryParams?.gameID ? queryParams?.gameID : this.userSelectionData?.id_coroebus_game, "_section_view": "1", "page_number": "1", "device_type": "W"

    };
    [err, res] = await HttpProtocols.to(DashboardModel.getUserBannerDataSectionView_1(body))
    if (!err && res?.status === 'success' && res?.statuscode === 200) {
      console.log(res);
      
      let body={
        _userid:this.userSelectionData?._personal_data?.USERID,
        _game:this.userSelectionData?.id_coroebus_game,
        _device:"W",
        _section:"Dashboard",
        _description:"Dashboard"
      }
  
      this.http.engagamentlog(body).subscribe(res=>{
        console.log(res);
        
      })

      this.sectionView_1 = res?.data
console.log(this.sectionView_1);

      console.log(this.sectionView_1?.theme_details?.[0]?.dark_color);
      
      this.pokeAnimationData = this.sectionView_1._poked_data
      // this.pokeAnimationData1=this.sectionView_1._poked_data[0].poke_description

      console.log(this.pokeAnimationData);
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.getBackImagesFromSectionView1 = this.sectionView_1._back_images[1]._data;

      this.getBackImages.push(...this.getBackImagesFromSectionView1);


      console.log(this.getBackImages);
      console.log("Section_view1_Data.....", this.getBackImagesFromSectionView1);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // alert(this.pokeAnimationData)

      this.rewardPoints = this.sectionView_1?._points?.filter(data => data?.label === 'Reward Point')
      //this.gamePoints = this.sectionView_1?._points?.filter(data => data?.label === 'Tribe Point' ? data?.label === 'Tribe Point' : data?.label === 'Game Point')
      this.gamePoints = this.sectionView_1?._points?.filter(data => data?.type === 'comp-point')
      document.body.classList.add('dashboard-bg-image');
      const bgImg = this.Util?.isMobile() ? this.sectionView_1?.theme_details?.[0]?.theme_background : this.sectionView_1?.theme_details?.[0]?.theme_background_web
      document.body.style.backgroundImage = 'url(' + bgImg + ')'

      this.web_profile_back_image= this.sectionView_1._back_images[1]._data[0].ranking_image_profile;
      console.log(this.web_profile_back_image);
      
     
      this.eventService.broadcast('passDataToHeader', {
        color: this.sectionView_1?.theme_details?.[0]?.dark_color,
        game_name: this.sectionView_1?._personal_data?.game_name,
        game_logo: this.sectionView_1?._personal_data?.game_logo,

      })

  
    
    
      this.store.dispatch(userActions.updateUserObj({
        data: {
          color: this.sectionView_1?.theme_details?.[0]?.dark_color,
          game_name: this.sectionView_1?._personal_data?.game_name,
          game_logo: this.sectionView_1?._personal_data?.game_logo,
          id_coroebus_game: this.sectionView_1?._personal_data?.id_coroebus_game,
          id_coroebus_team: this.sectionView_1?._personal_data?.id_coroebus_team,
          _personal_data: this.sectionView_1?._personal_data
        }

       
        
      }));
    } else {
      this.sectionView_1_err = 'Please try after some time'
    }
  }
}
